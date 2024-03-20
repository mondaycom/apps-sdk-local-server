import { z } from 'zod';

import type { JsonValue } from 'types/general.type';

export const jsonValueSchema: z.ZodSchema<JsonValue> = z.lazy(() =>
  z.union([
    z.date(),
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(jsonValueSchema),
    z.record(jsonValueSchema)
  ])
);
