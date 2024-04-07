import { Header, OperationId, Query, Res, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Delete, Get, Path, Put, Route, Tags } from 'tsoa';

import { StorageService } from './storage.service';

import type { TsoaResponse } from '@tsoa/runtime';
import type { IncrementStorageForKeyRequestBody, SetStorageForKeyRequestBody } from 'domain/storage/storage.types';
import type { JsonValue } from 'types/general.type';

@Route('storage')
@Tags('Storage')
export class StorageController {
  @Get('{key}')
  @OperationId('getByKeyFromStorage')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async getValue(
    @Path() key: string,
    @Query() shared: boolean,
    @Header('x-monday-access-token') accessToken: string,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
    @Res() serverError: TsoaResponse<500, { reason?: string }>
  ): Promise<{ value: JsonValue; version?: string }> {
    const storageService = new StorageService(accessToken);
    const { value, version, success } = await storageService.get(key);
    if (!success && value === null) {
      return notFoundResponse(404, { reason: 'Key not found' });
    }

    if (!success) {
      return serverError(500, { reason: 'An error occurred while fetching the key' });
    }

    return { value, version };
  }

  @Delete('{key}')
  @OperationId('deleteByKeyFromStorage')
  @SuccessResponse(StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT)
  public async deleteValue(@Header('x-monday-access-token') accessToken: string, @Path() key: string): Promise<void> {
    const storageService = new StorageService(accessToken);
    await storageService.delete(key);
  }

  @Put('{key}')
  @OperationId('upsertByKeyFromStorage')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async updateValue(
    @Header('x-monday-access-token') accessToken: string,
    @Path() key: string,
    @Body() body: SetStorageForKeyRequestBody
  ): Promise<JsonValue> {
    const { value, previousVersion, shared } = body;
    const storageService = new StorageService(accessToken);
    await storageService.set(key, value, { previousVersion, shared });

    return value;
  }

  @Put('counter/increment')
  @OperationId('incrementCounter')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async counterIncrement(
    @Header('x-monday-access-token') accessToken: string,
    @Body() body: IncrementStorageForKeyRequestBody
  ): Promise<string | undefined> {
    const { period, incrementBy, renewalDate, kind } = body;
    const storageService = new StorageService(accessToken);
    const value = await storageService.incrementCounter(period, { incrementBy, kind, renewalDate });
    return value?.newCounterValue?.toString();
  }
}
