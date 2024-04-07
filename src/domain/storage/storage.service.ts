import { isDefined } from 'types/type-guards';

import { BaseStorage } from './base-storage';

import type { JsonValue } from 'types/general.type';
import type {
  CounterOptions,
  CounterResponse,
  ErrorResponse,
  GetServerResponse,
  IStorageInstance,
  Options,
  Period,
  SetResponse
} from 'types/storage.type';

export class StorageService extends BaseStorage implements IStorageInstance {
  async incrementCounter(period: Period, options?: CounterOptions) {
    const result = await this.storageFetchV2<CounterResponse>(this.counterUrl(), {
      method: 'PUT',
      body: { ...(options || {}), period }
    });
    const { error, message, newCounterValue } = result || {};
    if (result?.error) {
      return { error: error, success: false };
    } else {
      return { message, newCounterValue, success: true };
    }
  }

  async delete(key: string) {
    const result = await this.storageFetch<ErrorResponse>(key, { method: 'DELETE' });
    if (result?.error) {
      return { error: result.error, success: false };
    } else {
      return { success: true };
    }
  }

  async get<T extends JsonValue>(key: string) {
    const result = await this.storageFetch<GetServerResponse<T>>(key, { method: 'GET' });
    if (!isDefined(result)) {
      return { success: false, value: null };
    }

    const { version, value } = result;

    return { success: true, value, version };
  }

  async set<T extends JsonValue>(key: string, value: T, options: Options = {}) {
    const { previousVersion } = options;

    const result = await this.storageFetch<SetResponse>(
      key,
      {
        method: 'POST',
        body: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value,
          ...(previousVersion && { previous_version: previousVersion })
        }
      },
      options
    );

    const { version, error } = result;
    if (version) {
      return { version, success: true };
    } else {
      if (error) {
        return { error, success: false };
      } else {
        return { error: 'unknown error occurred', success: false };
      }
    }
  }
}
