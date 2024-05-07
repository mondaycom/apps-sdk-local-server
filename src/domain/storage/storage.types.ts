import type { Period } from 'types/storage.type';

export type SetSecureStorageForKeyRequestBody = {
  value: string;
};

export type SetStorageForKeyRequestBody = { value: string };

export type IncrementStorageForKeyRequestBody = {
  period: Period;
  incrementBy: number;
  renewalDate: Date;
  kind: string;
};
