import { BadRequestError, InternalServerError } from 'errors/index';
import { isDefined } from 'types/type-guards';
import { fetchWrapper } from 'utils/fetch-wrapper';
import { Logger } from 'utils/logger';

import type { Options, RequestOptions, SearchOptions, Token } from 'types/storage.type';

export abstract class BaseStorage {
  protected logger: Logger;

  constructor(private readonly token: Token) {
    this.logger = new Logger('storage');
  }

  public counterUrl() {
    const storageUrl = this.getStorageUrlV2();
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const fullPath = `${storageUrl}/operations`;
    return fullPath;
  }

  protected async storageFetchV2<T>(url: string, options: RequestOptions) {
    return await this.baseFetch<T>(url, options);
  }

  protected async storageFetch<T>(key: string, options: RequestOptions, externalOptions?: Options) {
    const url = this.generateCrudPath(key, externalOptions);

    return await this.baseFetch<T>(url, options);
  }

  private async baseFetch<T>(url: string, options: RequestOptions) {
    const { method, body } = options;
    const stringifiedBody = JSON.stringify(body);
    if (!isDefined(method)) {
      throw new InternalServerError('An error occurred');
    }

    const headers = {
      Authorization: this.token,
      'Content-Type': 'application/json',
      'User-Agent': 'monday-apps-sdk'
    };

    let response: T | undefined;
    try {
      response = await fetchWrapper<T>(url, {
        method,
        headers,
        ...(body && { body: stringifiedBody })
      });
    } catch (error: unknown) {
      this.logger.error(
        { error: error as Error },
        '[storageFetch] Unexpected error occurred while communicating with storage'
      );
      throw new InternalServerError('An issue occurred while accessing storage');
    }

    return response as T;
  }

  private getStorageUrl() {
    const url = process.env.STORAGE_URL || 'https://apps-storage.monday.com/app_storage_api/v2';
    return url;
  }

  private getStorageUrlV2() {
    const url = process.env.STORAGE_URL || 'https://apps-storage.monday.com/api/v2';
    return url;
  }

  private generateCrudPath(key: string, options?: Options) {
    if (!isDefined(key)) {
      throw new BadRequestError('Missing key');
    }

    const shareGlobally = options?.shared ?? false;
    const storageUrl = this.getStorageUrl();
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const fullPath = `${storageUrl}/${key}?shareGlobally=${shareGlobally}`;
    return fullPath;
  }

  public searchUrl(key: string, options: SearchOptions) {
    const storageUrl = this.getStorageUrlV2();
    const cursor = options.cursor ? `&cursor=${options.cursor}` : '';
    const fullPath = `${storageUrl}/items?term=${key}${cursor}`;
    return fullPath;
  }
}
