import { z } from 'zod';

export const getSecureValueRequestSchema = {
  params: z.object({
    key: z.string()
  })
};
export const deleteSecureValueRequestSchema = {
  params: z.object({
    key: z.string()
  })
};
export const updateSecureValueRequestSchema = {
  params: z.object({
    key: z.string()
  }),
  body: z.object({
    value: z.string()
  })
};
