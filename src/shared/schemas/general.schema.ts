import { z } from 'zod';

export const jsonValueSchema: z.ZodSchema<unknown> = z.lazy(() =>
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
