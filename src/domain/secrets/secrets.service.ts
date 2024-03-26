import { readJsonFile, writeJsonFile } from 'utils/files';

import { SECRETS_FILE } from './secrets.consts';

import type { JsonValue } from 'types/general.type';

export class SecretService {
  static getSecretForKey(key: string): string {
    const environmentFile = readJsonFile(SECRETS_FILE);
    return environmentFile[key] as string;
  }

  static setSecretForKey(key: string, value: JsonValue) {
    const environmentFile = readJsonFile(SECRETS_FILE);
    environmentFile[key] = value;
    writeJsonFile(SECRETS_FILE, environmentFile);
  }
}
