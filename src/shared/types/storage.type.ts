import type { RequestInit } from 'node-fetch';
import type { JsonValue } from 'shared/types/general.type';

export type IStorageInstance = {
  set: <T extends JsonValue>(
    key: string,
    value: T,
    options?: Options
  ) => Promise<{ success: boolean; version?: string; error?: string }>;
  get: <T extends JsonValue>(key: string) => Promise<GetResponse<T>>;
  delete: (key: string) => Promise<{ error?: string; success: boolean }>;
};

export type RequestOptions = {
  body?: object;
} & Omit<RequestInit, 'body'>;

export type Options = {
  shared?: boolean;
  previousVersion?: string;
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

export type GetServerResponse<T extends JsonValue> = {
  version?: string;
  value: T | null;
};

export type GetResponse<T extends JsonValue> = {
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
