import { initFileIfNotExists, readJsonFile, writeJsonFile } from 'utils/files';

import { SECRETS_FILE } from './secrets.consts';

import type { JsonDataContract } from 'types/general.type';

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
    const secretsFile = readJsonFile(SECRETS_FILE);
    return secretsFile[key] as string;
  }

  static setSecretForKey(key: string, value: JsonDataContract['value']) {
    this.initialize();
    const secretsFile = readJsonFile(SECRETS_FILE);
    secretsFile[key] = value;
    writeJsonFile(SECRETS_FILE, secretsFile);
  }

  static getSecretKeys() {
    const secretsFile = readJsonFile(SECRETS_FILE);
    return Object.keys(secretsFile);
  }
}
