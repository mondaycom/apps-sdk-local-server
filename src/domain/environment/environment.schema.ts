import { z } from 'zod';

import { jsonValueSchema } from 'shared/schemas/general.schema';

export const getEnvironmentForKeyRequestSchema = {
  params: z.object({
    key: z.string()
  })
};

export const setEnvironmentForKeyRequestSchema = {
  params: z.object({
    key: z.string()
  }),
  body: z.object({
    value: jsonValueSchema
  })
};
