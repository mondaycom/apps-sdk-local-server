import { readJsonFile, writeJsonFile } from 'utils/files';

import { SECRETS_FILE } from './secrets.consts';

import type { JsonValue } from 'types/general.type';

export const getSecretForKey = (key: string) => {
  const environmentFile = readJsonFile(SECRETS_FILE);
  return environmentFile[key];
};

export const setSecretForKey = (key: string, value: JsonValue) => {
  const environmentFile = readJsonFile(SECRETS_FILE);
  environmentFile[key] = value;
  writeJsonFile(SECRETS_FILE, environmentFile);
};
