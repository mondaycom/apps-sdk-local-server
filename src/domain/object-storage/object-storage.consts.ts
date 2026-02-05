import { join } from 'node:path';

// Directory where files will be stored locally
export const OBJECT_STORAGE_DIR = process.env.VOLUME_PATH
  ? join(process.env.VOLUME_PATH, 'object-storage')
  : join(process.cwd(), '.local-data', 'object-storage');

// Metadata file to store file information
export const OBJECT_STORAGE_METADATA_FILE = join(OBJECT_STORAGE_DIR, '.metadata.json');
