import { OperationId, Res, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Delete, FormField, Get, Path, Post, Query, Route, Tags, UploadedFile } from 'tsoa';

import { ObjectStorageService } from './object-storage.service';

import type {
  DeleteFileResponse,
  DownloadFileResponse,
  GetFileInfoResponse,
  ListFilesResponse,
  UploadFileResponse
} from './object-storage.types';
import type { TsoaResponse } from '@tsoa/runtime';

@Route('object-storage')
@Tags('ObjectStorage')
export class ObjectStorageController {
  private objectStorageService: ObjectStorageService;

  constructor() {
    this.objectStorageService = new ObjectStorageService();
  }

  /**
   * Upload file with unified content parameter
   * This endpoint accepts all content types through a single 'content' parameter
   * String content should be encoded as bytes and sent as file upload
   */
  @Post('files')
  @OperationId('uploadFile')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async uploadFile(
    @Res() serverError: TsoaResponse<StatusCodes.INTERNAL_SERVER_ERROR, { reason?: string }>,
    @Res() badRequest: TsoaResponse<StatusCodes.BAD_REQUEST, { reason: string }>,
    @UploadedFile() content?: Express.Multer.File,
    @FormField() filename?: string,
    @FormField() contentType?: string,
    @FormField() metadata?: string // JSON string of metadata
  ): Promise<UploadFileResponse> {
    try {
      // Input validation - HTTP/Controller concerns
      if (!content) {
        return badRequest(StatusCodes.BAD_REQUEST, {
          reason: 'Content must be provided'
        });
      }

      // Determine filename with fallback logic - HTTP concern
      const finalFilename = filename || content.originalname;
      if (!finalFilename) {
        return badRequest(StatusCodes.BAD_REQUEST, {
          reason: 'Filename is required'
        });
      }

      // Parse metadata JSON - Request transformation
      let parsedMetadata: Record<string, string> | undefined;
      if (metadata) {
        try {
          parsedMetadata = JSON.parse(metadata);
        } catch (_error) {
          return badRequest(StatusCodes.BAD_REQUEST, {
            reason: 'Invalid metadata JSON format'
          });
        }
      }

      // Determine content type - HTTP concern
      const finalContentType = contentType || content.mimetype || 'application/octet-stream';

      // Prepare options for service
      const options = {
        contentType: finalContentType,
        metadata: parsedMetadata
      };

      // Call service and return raw response
      return await this.objectStorageService.uploadFile(finalFilename, content.buffer, options);
    } catch (error) {
      return serverError(StatusCodes.INTERNAL_SERVER_ERROR, {
        reason: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  @Get('files/{filename}')
  @OperationId('downloadFile')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async downloadFile(
    @Path() filename: string,
    @Res() serverError: TsoaResponse<StatusCodes.INTERNAL_SERVER_ERROR, { reason?: string }>
  ): Promise<DownloadFileResponse> {
    try {
      return await this.objectStorageService.downloadFile(filename);
    } catch (error) {
      return serverError(StatusCodes.INTERNAL_SERVER_ERROR, {
        reason: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  @Delete('files/{filename}')
  @OperationId('deleteFile')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async deleteFile(
    @Path() filename: string,
    @Res() serverError: TsoaResponse<StatusCodes.INTERNAL_SERVER_ERROR, { reason?: string }>
  ): Promise<DeleteFileResponse> {
    try {
      return await this.objectStorageService.deleteFile(filename);
    } catch (error) {
      return serverError(StatusCodes.INTERNAL_SERVER_ERROR, {
        reason: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  @Get('files')
  @OperationId('listFiles')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async listFiles(
    @Res() serverError: TsoaResponse<StatusCodes.INTERNAL_SERVER_ERROR, { reason?: string }>,
    @Query() prefix?: string,
    @Query() maxResults?: number,
    @Query() pageToken?: string
  ): Promise<ListFilesResponse> {
    try {
      const options = { prefix, maxResults, pageToken };
      return await this.objectStorageService.listFiles(options);
    } catch (error) {
      return serverError(StatusCodes.INTERNAL_SERVER_ERROR, {
        reason: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  @Get('files/{filename}/info')
  @OperationId('getFileInfo')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async getFileInfo(
    @Path() filename: string,
    @Res() serverError: TsoaResponse<StatusCodes.INTERNAL_SERVER_ERROR, { reason?: string }>
  ): Promise<GetFileInfoResponse> {
    try {
      return await this.objectStorageService.getFileInfo(filename);
    } catch (error) {
      return serverError(StatusCodes.INTERNAL_SERVER_ERROR, {
        reason: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }
}
