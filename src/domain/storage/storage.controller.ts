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

    // TODO:
    /**
     * Differences Identified:
     * Response Data Type:
     * SIDECAR uses StorageDataContract.
     * TARGET directly returns a JSON object.
     * Required Changes to TARGET:
     * Standardize Response Type:
     * Adjust TARGET to use StorageDataContract for the response type to ensure type consistency.
     */
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
    // TODO
    /**
     * Differences Identified:
     * Request Body Type:
     * SIDECAR uses StorageDataContract.
     * TARGET uses SetStorageForKeyRequestBody.
     * Required Changes to TARGET:
     * Align Request Body Type:
     * Change the request body type in TARGET from SetStorageForKeyRequestBody to StorageDataContract to maintain type consistency across both APIs.
     */
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

    // TODO:
    /**
     * Differences Identified:
     * Request Body Type:
     * SIDECAR uses IncrementCounterParams.
     * TARGET uses IncrementStorageForKeyRequestBody.
     * Method Type:
     * SIDECAR uses POST.
     * TARGET uses PUT.
     * Required Changes to TARGET:
     * Align Method Type:
     * Change the method type in TARGET from PUT to POST to match SIDECAR.
     * Align Request Body Type:
     * Change the request body type in TARGET from IncrementStorageForKeyRequestBody to IncrementCounterParams to maintain consistency.
     */
  }
}
