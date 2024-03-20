import { StatusCodes } from 'http-status-codes';

import { MONDAY_ACCESS_TOKEN_HEADER_KEY } from 'domain/storage/storage.consts';
import { validateZodSchema } from 'middlewares/schema-validation.middleware';
import { getTokenFromHeader } from 'utils/requests';

import {
  counterIncrementRequestSchema,
  deleteValueRequestSchema,
  getValueRequestSchema,
  updateValueRequestSchema
} from './storage.schema';
import { StorageService } from './storage.service';

export const getValue = validateZodSchema(getValueRequestSchema, async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const token = getTokenFromHeader(req, MONDAY_ACCESS_TOKEN_HEADER_KEY);
  const { key } = req.params;
  const storageService = new StorageService(token);
  const { value, version } = await storageService.get(key);
  return res.status(StatusCodes.OK).json({ value, version });
});

export const deleteValue = validateZodSchema(deleteValueRequestSchema, async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const token = getTokenFromHeader(req, MONDAY_ACCESS_TOKEN_HEADER_KEY);
  const { key } = req.params;
  const storageService = new StorageService(token);
  await storageService.delete(key);
  return res.status(StatusCodes.NO_CONTENT).send();
});

export const updateValue = validateZodSchema(updateValueRequestSchema, async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const token = getTokenFromHeader(req, MONDAY_ACCESS_TOKEN_HEADER_KEY);
  const { key } = req.params;
  const { value, previousVersion, shared } = req.body;
  const storageService = new StorageService(token);
  await storageService.set(key, value, { previousVersion, shared });
  return res.status(StatusCodes.OK).json(value);
});

export const counterIncrement = validateZodSchema(counterIncrementRequestSchema, async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const token = getTokenFromHeader(req, MONDAY_ACCESS_TOKEN_HEADER_KEY);
  const { period, incrementBy, renewalDate, kind } = req.body;
  const storageService = new StorageService(token);
  const value = await storageService.incrementCounter(period, { incrementBy, kind, renewalDate });
  return res.status(StatusCodes.OK).json(value?.newCounterValue?.toString());
});
