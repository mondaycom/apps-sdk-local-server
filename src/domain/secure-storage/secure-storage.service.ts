import { initDb } from 'shared/utils/local-db';
import { isDefined } from 'types/type-guards';
import { decrypt, encrypt } from 'utils/cipher';

import { SECURE_STORAGE_FILE } from './secure-storage.consts';

import type { JsonValue } from 'types/general.type';

const secureStorage = initDb(SECURE_STORAGE_FILE);

export class SecureStorageService {
  static getSecureValue(key: string) {
    const encryptedValue = secureStorage.get<string>(key);

    if (!isDefined(encryptedValue)) {
      return null;
    }

    const stringifiedValue = decrypt(encryptedValue);
    const valueAsObject = JSON.parse(stringifiedValue);
    return valueAsObject as JsonValue;
  }

  static deleteSecureValue(key: string) {
    secureStorage.delete(key);
  }

  static setSecureValue(key: string, value: JsonValue) {
    const stringifiedValue = JSON.stringify(value);
    const encryptedValue = encrypt(stringifiedValue);
    secureStorage.set(key, encryptedValue);
  }
}
