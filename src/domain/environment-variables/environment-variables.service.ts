import { ENVIRONMENT_VARIABLES_FILE } from 'domain/environment-variables/environment-variables.consts';
import { initFileIfNotExists, readJsonFile, writeJsonFile } from 'utils/files';

import type { JsonValue } from 'types/general.type';

export class EnvironmentVariablesService {
  private static isInitialized = false;

  private static initialize() {
    if (this.isInitialized) {
      return;
    }

    initFileIfNotExists(ENVIRONMENT_VARIABLES_FILE);
    this.isInitialized = true;
  }

  static getEnvironmentVariableForKey(key: string) {
    this.initialize();
    const environmentFile = readJsonFile(ENVIRONMENT_VARIABLES_FILE);
    return environmentFile[key];
  }

  static setEnvironmentVariableForKey(key: string, value: JsonValue) {
    this.initialize();
    const environmentFile = readJsonFile(ENVIRONMENT_VARIABLES_FILE);
    environmentFile[key] = value;
    writeJsonFile(ENVIRONMENT_VARIABLES_FILE, environmentFile);
  }

  static getEnvironmentVariableKeys(): Array<string> {
    this.initialize();
    const environmentFile = readJsonFile(ENVIRONMENT_VARIABLES_FILE);
    return Object.keys(environmentFile);
  }
}
