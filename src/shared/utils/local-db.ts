import { existsSync, readFileSync, writeFileSync } from 'node:fs';

import { InternalServerError } from 'errors/index';
import { isDefined } from 'types/type-guards';
import { hasDiskWriteAccess } from 'utils/files';
import { Logger } from 'utils/logger';

import type { JsonValue } from 'shared/types/general.type';

const logger = new Logger('storage');

const inMemoryData: Record<string, JsonValue> = {};

class LocalMemoryDb {
  set<T extends JsonValue>(key: string, value: T) {
    inMemoryData[key] = value;
  }

  delete(key: string) {
    delete inMemoryData[key];
  }

  get<T>(key: string) {
    if (key in inMemoryData) {
      return inMemoryData[key] as T;
    }

    return null;
  }
}

class LocalDb {
  private readonly dbFilePath: string;
  private memoryData: Record<string, JsonValue>;

  constructor(dbFileName: string) {
    if (!hasDiskWriteAccess()) {
      throw new InternalServerError('Missing write permissions');
    }

    this.dbFilePath = dbFileName;
    if (!existsSync(this.dbFilePath)) {
      this.memoryData = {};
      writeFileSync(this.dbFilePath, JSON.stringify(this.memoryData), { encoding: 'utf8', flag: 'wx' });
      return;
    }

    const stringifiedDbData = readFileSync(this.dbFilePath, 'utf-8');
    if (isDefined(stringifiedDbData)) {
      this.memoryData = JSON.parse(stringifiedDbData);
      return;
    }

    this.memoryData = {};
  }

  set<T extends JsonValue>(key: string, value: T) {
    this.memoryData[key] = value;

    writeFileSync(this.dbFilePath, JSON.stringify(this.memoryData));
  }

  delete(key: string) {
    delete this.memoryData[key];
    writeFileSync(this.dbFilePath, JSON.stringify(this.memoryData));
  }

  get<T>(key: string) {
    if (key in this.memoryData) {
      return this.memoryData[key] as T;
    }

    const data = readFileSync(this.dbFilePath, 'utf-8');
    const parsedData: Record<string, JsonValue> = JSON.parse(data);
    this.memoryData = parsedData;
    if (key in this.memoryData) {
      return this.memoryData[key] as T;
    }

    return null;
  }
}

let initializedStorage: LocalDb | LocalMemoryDb;

export const initDb = (dbNameFilePath: string, options?: { reInitialize: boolean }) => {
  if (isDefined(initializedStorage) && !options?.reInitialize) {
    return initializedStorage;
  }

  if (hasDiskWriteAccess()) {
    logger.info('Initializing local db');
    initializedStorage = new LocalDb(dbNameFilePath);
    return initializedStorage;
  }

  logger.warn('No disk access, initializing in memory db (not data persistence)');
  initializedStorage = new LocalMemoryDb();

  return initializedStorage;
};
