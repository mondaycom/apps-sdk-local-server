import { SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Delete, Get, Path, Put, Request, Route, Tags } from 'tsoa';

import { MONDAY_ACCESS_TOKEN_HEADER_KEY } from 'domain/storage/storage.consts';
import { getTokenFromHeader } from 'utils/requests';

import { StorageService } from './storage.service';

import type { IncrementStorageForKeyRequestBody, SetStorageForKeyRequestBody } from 'domain/storage/storage.types';
import type { Request as ExpressRequest } from 'express';
import type { JsonValue } from 'types/general.type';

@Route('storage')
@Tags('Storage')
export class StorageController {
  @Get(':key')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async getValue(
    @Request() req: ExpressRequest,
    @Path() key: string
  ): Promise<{ value: JsonValue; version?: string }> {
    const token = getTokenFromHeader(req, MONDAY_ACCESS_TOKEN_HEADER_KEY);
    const storageService = new StorageService(token);
    const { value, version } = await storageService.get(key);
    return { value, version };
  }

  @Delete(':key')
  @SuccessResponse(StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT)
  public async deleteValue(@Request() req: ExpressRequest, @Path() key: string): Promise<void> {
    const token = getTokenFromHeader(req, MONDAY_ACCESS_TOKEN_HEADER_KEY);
    const storageService = new StorageService(token);
    await storageService.delete(key);
  }

  @Put(':key')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async updateValue(
    @Request() req: ExpressRequest,
    @Path() key: string,
    @Body() body: SetStorageForKeyRequestBody
  ): Promise<JsonValue> {
    const token = getTokenFromHeader(req, MONDAY_ACCESS_TOKEN_HEADER_KEY);
    const { value, previousVersion, shared } = body;
    const storageService = new StorageService(token);
    await storageService.set(key, value, { previousVersion, shared });
    return value;
  }

  @Put('counter/increment')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async counterIncrement(
    @Request() req: ExpressRequest,
    @Body() body: IncrementStorageForKeyRequestBody
  ): Promise<string | undefined> {
    const token = getTokenFromHeader(req, MONDAY_ACCESS_TOKEN_HEADER_KEY);
    const { period, incrementBy, renewalDate, kind } = body;
    const storageService = new StorageService(token);
    const value = await storageService.incrementCounter(period, { incrementBy, kind, renewalDate });
    return value?.newCounterValue?.toString();
  }
}
