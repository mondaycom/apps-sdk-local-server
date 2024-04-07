import { z } from 'zod';

import { jsonValueSchema } from 'shared/schemas/general.schema';

export const getSecretForKeyRequestSchema = {
  params: z.object({
    key: z.string()
  })
};

export const setSecretForKeyRequestSchema = {
  params: z.object({
    key: z.string()
  }),
  body: z.object({
    value: jsonValueSchema
  })
};
