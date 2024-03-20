import { StatusCodes } from 'http-status-codes';

import { validateZodSchema } from 'middlewares/schema-validation.middleware';

import { queueRequestSchema, validateSecretRequestSchema } from './pub-sub.schema';
import * as PubSubService from './pub-sub.service';

export const queue = validateZodSchema(queueRequestSchema, (req, res) => {
  const { message } = req.body;
  const id = PubSubService.publishMessage(message);

  return res.status(StatusCodes.OK).json({ id });
});

export const validateSecret = validateZodSchema(validateSecretRequestSchema, (req, res) => {
  const { secret } = req.body;
  const valid = PubSubService.validateSecret(secret);

  return res.status(StatusCodes.OK).json({ valid });
});
