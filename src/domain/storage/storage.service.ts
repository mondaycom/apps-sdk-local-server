import { isDefined } from 'types/type-guards';

import { BaseStorage } from './base-storage';

import type { JsonDataContract } from 'types/general.type';
import type {
  CounterOptions,
  CounterResponse,
  ErrorResponse,
  GetServerResponse,
  IStorageInstance,
  Options,
  Period,
  SearchOptions,
  SearchResponse,
  SearchServerResponse,
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

  async get<T extends JsonDataContract['value']>(key: string) {
    const result = await this.storageFetch<GetServerResponse<T>>(key, { method: 'GET' });
    if (!isDefined(result)) {
      return { success: false, value: null };
    }

    const { version, value } = result;

    return { success: true, value, version };
  }

  async set<T extends JsonDataContract['value']>(key: string, value: T, options: Options = {}) {
    const { previousVersion, ttl } = options;

    const result = await this.storageFetch<SetResponse>(
      key,
      {
        method: 'POST',
        body: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value,
          ...(previousVersion && { previous_version: previousVersion }),
          ...(ttl && { ttl })
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

  async search<T extends JsonDataContract['value']>(
    key: string,
    options: SearchOptions = {}
  ): Promise<SearchResponse<T>> {
    const url = this.searchUrl(key, options);
    const params = { method: 'GET' };
    const result = await this.storageFetchV2<SearchServerResponse<T>>(url, params);
    if (!isDefined(result)) {
      return { success: false, records: null };
    }

    const response: SearchResponse<T> = { success: true, records: result.records };
    if (result.cursor) {
      response.cursor = result.cursor;
    }
    return response;
  }
}
