import {
  accessSync,
  existsSync,
  constants as fsConstants,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync
} from 'node:fs';
import { dirname } from 'path';

import appRoot from 'app-root-path';

import { InternalServerError } from 'shared/errors';
import { isDefined } from 'types/type-guards';

import type { JsonDataContract } from 'types/general.type';

export const initFileIfNotExists = (filePath: string) => {
  if (!hasDiskWriteAccess()) {
    throw new InternalServerError('Missing write permissions');
  }

  const dirPath = dirname(filePath);

  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
  if (!existsSync(filePath)) {
    writeFileSync(filePath, JSON.stringify({}), { encoding: 'utf8', flag: 'wx' });
  }
};

export const hasDiskWriteAccess = () => {
  const rootDir = appRoot.toString();
  try {
    accessSync(rootDir, fsConstants.W_OK);
    return true;
  } catch (_err) {
    return false;
  }
};

export const readJsonFile = (fileName: string) => {
  if (!existsSync(fileName)) {
    throw new InternalServerError('An error occurred while reading json file');
  }

  const data = readFileSync(fileName, 'utf-8');
  if (isDefined(data)) {
    const parsedData: Record<string, JsonDataContract['value']> = JSON.parse(data);
    return parsedData;
  }

  throw new InternalServerError('An error occurred while reading json file');
};

export const writeJsonFile = (fileName: string, data: Record<string, unknown>) => {
  writeFileSync(fileName, JSON.stringify(data, null, 2), 'utf-8');
};

export const deleteFile = (fileName: string) => {
  if (existsSync(fileName)) {
    unlinkSync(fileName);
  }
};
