import { z } from 'zod';

export const queueRequestSchema = {
  body: z.object({
    message: z.string()
  })
};

export const validateSecretRequestSchema = {
  body: z.object({
    secret: z.string()
  })
};
