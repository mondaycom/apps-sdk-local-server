import { z } from 'zod';

import { LogMethods } from 'domain/log/logs.consts';

export const writeLogRequestSchema = {
  body: z.object({
    method: z.nativeEnum(LogMethods),
    message: z.string().optional(),
    error: z.union([z.string(), z.record(z.unknown())]).optional(),
    params: z.record(z.unknown()).optional()
  })
};
