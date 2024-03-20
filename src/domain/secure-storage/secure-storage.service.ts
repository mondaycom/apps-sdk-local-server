import { initDb } from 'shared/utils/local-db';
import { isDefined } from 'types/type-guards';
import { decrypt, encrypt } from 'utils/cipher';

import { SECURE_STORAGE_FILE } from './secure-storage.consts';

import type { JsonValue } from 'types/general.type';

const storage = initDb(SECURE_STORAGE_FILE);

export const getSecureValue = (key: string) => {
  const encryptedValue = storage.get<string>(key);

  if (!isDefined(encryptedValue)) {
    return null;
  }

  const stringifiedValue = decrypt(encryptedValue);
  const valueAsObject = JSON.parse(stringifiedValue);
  return valueAsObject as JsonValue;
};
export const deleteSecureValue = (key: string) => {
  storage.delete(key);
};
export const setSecureValue = (key: string, value: JsonValue) => {
  const stringifiedValue = JSON.stringify(value);
  const encryptedValue = encrypt(stringifiedValue);
  storage.set(key, encryptedValue);
};
