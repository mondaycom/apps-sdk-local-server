import { z } from 'zod';

import { jsonValueSchema } from 'shared/schemas/general.schema';

export const getEnvironmentVariableForKeyRequestSchema = {
  params: z.object({
    key: z.string()
  })
};

export const setEnvironmentVariableForKeyRequestSchema = {
  params: z.object({
    key: z.string()
  }),
  body: z.object({
    value: jsonValueSchema
  })
};
