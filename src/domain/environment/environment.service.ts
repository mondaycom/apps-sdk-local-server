import { SECRETS_FILE } from 'domain/secrets/secrets.consts';
import { initFileIfNotExists, readJsonFile, writeJsonFile } from 'utils/files';

import { ENVIRONMENT_FILE } from './environment.consts';

import type { JsonValue } from 'types/general.type';

export class EnvironmentService {
  private static isInitialized = false;

  private static initialize() {
    if (this.isInitialized) {
      return;
    }

    initFileIfNotExists(SECRETS_FILE);
    this.isInitialized = true;
  }

  static getEnvironmentForKey(key: string) {
    this.initialize();
    const environmentFile = readJsonFile(ENVIRONMENT_FILE);
    return environmentFile[key];
  }

  static setEnvironmentForKey(key: string, value: JsonValue) {
    this.initialize();
    const environmentFile = readJsonFile(ENVIRONMENT_FILE);
    environmentFile[key] = value;
    writeJsonFile(ENVIRONMENT_FILE, environmentFile);
  }
}
