import type { Period } from 'types/storage.type';

export type SetSecureStorageForKeyRequestBody = {
  value: string;
};

export type SetStorageForKeyRequestBody = { value: string; previousVersion?: string; shared?: boolean };

export type IncrementStorageForKeyRequestBody = {
  period: Period;
  incrementBy: number;
  renewalDate: Date;
  kind: string;
};
