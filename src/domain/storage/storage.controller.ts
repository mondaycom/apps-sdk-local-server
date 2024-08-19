import { Header, OperationId, Query, Res, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Delete, Get, Path, Put, Route, Tags } from 'tsoa';

import { StorageService } from './storage.service';

import type { TsoaResponse } from '@tsoa/runtime';
import type { IncrementStorageForKeyRequestBody, StorageDataContract } from 'domain/storage/storage.types';
import type { JsonDataContract } from 'types/general.type';

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
    @Res() notFoundResponse: TsoaResponse<StatusCodes.NOT_FOUND, { reason: string }>,
    @Res() serverError: TsoaResponse<StatusCodes.INTERNAL_SERVER_ERROR, { reason?: string }>
  ): Promise<StorageDataContract> {
    const storageService = new StorageService(accessToken);
    const { value, version, success } = await storageService.get(key);
    if (!success && value === null) {
      return notFoundResponse(StatusCodes.NOT_FOUND, { reason: 'Key not found' });
    }

    if (!success) {
      return serverError(StatusCodes.INTERNAL_SERVER_ERROR, { reason: 'An error occurred while fetching the key' });
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
    @Body() body: JsonDataContract,
    @Query() shared?: boolean,
    @Query() previousVersion?: string
  ) {
    const { value } = body;
    const storageService = new StorageService(accessToken);
    const result = await storageService.set(key, value, { previousVersion, shared });
    return result;
  }

  @Put('counter/increment')
  @OperationId('incrementCounter')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async counterIncrement(
    @Header('x-monday-access-token') accessToken: string,
    @Body() body: IncrementStorageForKeyRequestBody
  ) {
    const { period, incrementBy, renewalDate, kind } = body;
    const storageService = new StorageService(accessToken);
    const result = await storageService.incrementCounter(period, { incrementBy, kind, renewalDate });
    return result;
  }
}
