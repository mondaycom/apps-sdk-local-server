import type { LogMethods } from 'domain/log/logs.consts';

export type WriteLogRequestBody = {
  method: LogMethods;
  message: string;
  error?: string | Record<string, unknown>;
  payload?: Record<string, unknown>;
};
