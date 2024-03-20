import { z } from 'zod';

import { Period } from 'types/storage.type';

export const getValueRequestSchema = {
  params: z.object({
    key: z.string()
  })
};
export const deleteValueRequestSchema = {
  params: z.object({
    key: z.string()
  })
};
export const updateValueRequestSchema = {
  params: z.object({
    key: z.string()
  }),
  body: z.object({
    value: z.string(),
    previousVersion: z.string().optional(),
    shared: z.boolean().optional()
  })
};
export const counterIncrementRequestSchema = {
  body: z.object({
    renewalDate: z.date().optional(),
    kind: z.string().optional(),
    incrementBy: z.number().optional(),
    period: z.nativeEnum(Period)
  })
};
