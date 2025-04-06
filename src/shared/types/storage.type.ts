import type { RequestInit } from 'node-fetch';
import type { JsonDataContract } from 'shared/types/general.type';

export type IStorageInstance = {
  set: <T extends JsonDataContract['value']>(
    key: string,
    value: T,
    options?: Options
  ) => Promise<{ success: boolean; version?: string; error?: string }>;
  get: <T extends JsonDataContract['value']>(key: string) => Promise<GetResponse<T>>;
  delete: (key: string) => Promise<{ error?: string; success: boolean }>;
};

export type RequestOptions = {
  body?: object;
} & Omit<RequestInit, 'body'>;

export type Options = {
  shared?: boolean;
  previousVersion?: string;
  ttl?: number;
};

export type Token = string;

export enum Period {
  DAILY = 'DAILY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export type CounterOptions = {
  incrementBy?: number;
  kind?: string;
  renewalDate?: Date;
};

export type GetServerResponse<T extends JsonDataContract['value']> = {
  version?: string;
  value: T | null;
};

export type GetResponse<T extends JsonDataContract['value']> = {
  success: boolean;
  error?: string;
} & GetServerResponse<T>;

export type CounterResponse = {
  message: string;
  newCounterValue: number;
  error?: string;
};

export type SetResponse = {
  version?: string;
  success: boolean;
  error?: string;
};

export type DeleteResponse = {
  success: boolean;
  error?: string;
};

export type ErrorResponse =
  | {
      error?: string;
    }
  | undefined
  | null;

export type SearchOptions = {
  cursor?: string;
};

export type SearchEntity<T extends JsonDataContract['value']> = {
  key: string;
  value: T;
  backendOnly: boolean;
};

export type SearchServerResponse<T extends JsonDataContract['value']> = {
  records: Array<SearchEntity<T>> | null;
  cursor?: string;
};

export type SearchResponse<T extends JsonDataContract['value']> = {
  success: boolean;
  error?: string;
} & SearchServerResponse<T>;
