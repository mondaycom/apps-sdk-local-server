import { initFileIfNotExists, readJsonFile, writeJsonFile } from 'utils/files';

import { SECRETS_FILE } from './secrets.consts';

import type { JsonValue } from 'types/general.type';

export class SecretService {
  private static isInitialized = false;

  private static initialize() {
    if (this.isInitialized) {
      return;
    }

    initFileIfNotExists(SECRETS_FILE);
    this.isInitialized = true;
  }

  static getSecretForKey(key: string): string {
    this.initialize();
    const environmentFile = readJsonFile(SECRETS_FILE);
    return environmentFile[key] as string;
  }

  static setSecretForKey(key: string, value: JsonValue) {
    this.initialize();
    const environmentFile = readJsonFile(SECRETS_FILE);
    environmentFile[key] = value;
    writeJsonFile(SECRETS_FILE, environmentFile);
  }
}
