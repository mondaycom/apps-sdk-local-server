import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { Logger } from 'utils/logger';

import { OBJECT_STORAGE_DIR, OBJECT_STORAGE_METADATA_FILE } from './object-storage.consts';

import type {
  DeleteFileResponse,
  DownloadFileResponse,
  FileInfo,
  GetFileInfoResponse,
  ListFilesOptions,
  ListFilesResponse,
  UploadFileOptions,
  UploadFileResponse
} from './object-storage.types';

const logger = new Logger('object-storage');

type StoredFileMetadata = {
  name: string;
  contentType: string;
  metadata: Record<string, string>;
  size: number;
  lastModified: string;
  etag: string;
};

type MetadataStore = Record<string, StoredFileMetadata>;

export class ObjectStorageService {
  private metadataStore: MetadataStore;

  constructor() {
    this.ensureStorageDir();
    this.metadataStore = this.loadMetadata();
  }

  private ensureStorageDir(): void {
    if (!existsSync(OBJECT_STORAGE_DIR)) {
      mkdirSync(OBJECT_STORAGE_DIR, { recursive: true });
      logger.info(`Created object storage directory: ${OBJECT_STORAGE_DIR}`);
    }
  }

  private loadMetadata(): MetadataStore {
    if (!existsSync(OBJECT_STORAGE_METADATA_FILE)) {
      return {};
    }

    try {
      const data = readFileSync(OBJECT_STORAGE_METADATA_FILE, 'utf-8');
      return JSON.parse(data) as MetadataStore;
    } catch (error) {
      logger.warn('Failed to load metadata file, starting fresh');
      return {};
    }
  }

  private saveMetadata(): void {
    const dirPath = dirname(OBJECT_STORAGE_METADATA_FILE);
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }
    writeFileSync(OBJECT_STORAGE_METADATA_FILE, JSON.stringify(this.metadataStore, null, 2));
  }

  private getFilePath(fileName: string): string {
    // Sanitize filename to prevent path traversal
    const sanitizedName = fileName.replace(/\.\./g, '').replace(/^\/+/, '');
    return join(OBJECT_STORAGE_DIR, sanitizedName);
  }

  private generateEtag(content: Buffer): string {
    return createHash('md5').update(content).digest('hex');
  }

  async uploadFile(fileName: string, content: Buffer, options: UploadFileOptions = {}): Promise<UploadFileResponse> {
    try {
      const filePath = this.getFilePath(fileName);
      const dirPath = dirname(filePath);

      // Ensure directory exists for nested paths
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
      }

      // Write file to disk
      writeFileSync(filePath, content);

      const etag = this.generateEtag(content);
      const now = new Date().toISOString();

      // Store metadata
      this.metadataStore[fileName] = {
        name: fileName,
        contentType: options.contentType || 'application/octet-stream',
        metadata: options.metadata || {},
        size: content.length,
        lastModified: now,
        etag
      };
      this.saveMetadata();

      const fileUrl = `file://${filePath}`;

      logger.info(`File uploaded successfully: ${fileName}`);

      return {
        success: true,
        fileName,
        fileUrl
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error(`Failed to upload file: ${errorMessage}`);
      return {
        success: false,
        error: `Failed to upload file: ${errorMessage}`
      };
    }
  }

  async downloadFile(fileName: string): Promise<DownloadFileResponse> {
    try {
      const filePath = this.getFilePath(fileName);

      if (!existsSync(filePath)) {
        return {
          success: false,
          error: 'File not found'
        };
      }

      const content = readFileSync(filePath);
      const metadata = this.metadataStore[fileName];

      return {
        success: true,
        content,
        contentType: metadata?.contentType || 'application/octet-stream'
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error(`Failed to download file: ${errorMessage}`);
      return {
        success: false,
        error: `Failed to download file: ${errorMessage}`
      };
    }
  }

  async deleteFile(fileName: string): Promise<DeleteFileResponse> {
    try {
      const filePath = this.getFilePath(fileName);

      if (!existsSync(filePath)) {
        return {
          success: false,
          error: 'File not found'
        };
      }

      unlinkSync(filePath);
      delete this.metadataStore[fileName];
      this.saveMetadata();

      logger.info(`File deleted successfully: ${fileName}`);

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error(`Failed to delete file: ${errorMessage}`);
      return {
        success: false,
        error: `Failed to delete file: ${errorMessage}`
      };
    }
  }

  async listFiles(options: ListFilesOptions = {}): Promise<ListFilesResponse> {
    try {
      const { prefix, maxResults = 100, pageToken } = options;

      // Get all files from metadata
      let fileNames = Object.keys(this.metadataStore);

      // Filter by prefix if provided
      if (prefix) {
        fileNames = fileNames.filter((name) => name.startsWith(prefix));
      }

      // Sort alphabetically for consistent pagination
      fileNames.sort();

      // Handle pagination
      let startIndex = 0;
      if (pageToken) {
        const decodedToken = Buffer.from(pageToken, 'base64').toString('utf-8');
        startIndex = parseInt(decodedToken, 10) || 0;
      }

      const endIndex = startIndex + maxResults;
      const paginatedNames = fileNames.slice(startIndex, endIndex);

      const files: Array<FileInfo> = paginatedNames.map((name) => {
        const metadata = this.metadataStore[name];
        return {
          name: metadata.name,
          size: metadata.size,
          contentType: metadata.contentType,
          lastModified: new Date(metadata.lastModified),
          etag: metadata.etag,
          metadata: metadata.metadata
        };
      });

      const response: ListFilesResponse = {
        success: true,
        files
      };

      // Add pagination token if there are more results
      if (endIndex < fileNames.length) {
        response.nextPageToken = Buffer.from(String(endIndex)).toString('base64');
      }

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error(`Failed to list files: ${errorMessage}`);
      return {
        success: false,
        error: `Failed to list files: ${errorMessage}`
      };
    }
  }

  async getFileInfo(fileName: string): Promise<GetFileInfoResponse> {
    try {
      const filePath = this.getFilePath(fileName);

      if (!existsSync(filePath)) {
        return {
          success: false,
          error: 'File not found'
        };
      }

      const metadata = this.metadataStore[fileName];
      if (!metadata) {
        // If file exists but no metadata, regenerate it
        const stats = statSync(filePath);
        const content = readFileSync(filePath);
        return {
          success: true,
          fileInfo: {
            name: fileName,
            size: stats.size,
            contentType: 'application/octet-stream',
            lastModified: stats.mtime,
            etag: this.generateEtag(content),
            metadata: {}
          }
        };
      }

      return {
        success: true,
        fileInfo: {
          name: metadata.name,
          size: metadata.size,
          contentType: metadata.contentType,
          lastModified: new Date(metadata.lastModified),
          etag: metadata.etag,
          metadata: metadata.metadata
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error(`Failed to get file info: ${errorMessage}`);
      return {
        success: false,
        error: `Failed to get file info: ${errorMessage}`
      };
    }
  }
}
