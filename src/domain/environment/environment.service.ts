import { readJsonFile, writeJsonFile } from 'utils/files';

import { ENVIRONMENT_FILE } from './environment.consts';

import type { JsonValue } from 'types/general.type';

export const getEnvironmentForKey = (key: string) => {
  const environmentFile = readJsonFile(ENVIRONMENT_FILE);
  return environmentFile[key];
};

export const setEnvironmentForKey = (key: string, value: JsonValue) => {
  const environmentFile = readJsonFile(ENVIRONMENT_FILE);
  environmentFile[key] = value;
  writeJsonFile(ENVIRONMENT_FILE, environmentFile);
};
