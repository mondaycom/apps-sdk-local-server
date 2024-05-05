import { OperationId, Res, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Delete, Get, Path, Put, Route, Tags } from 'tsoa';

import { isDefined } from 'types/type-guards';

import { SecureStorageService } from './secure-storage.service';

import type { TsoaResponse } from '@tsoa/runtime';
import type { SetSecureStorageForKeyRequestBody } from 'domain/secure-storage/secure-storage.types';
import type { JsonValue } from 'types/general.type';

@Route('secure-storage')
@Tags('SecureStorage')
export class SecureStorageController {
  @Get('{key}')
  @OperationId('getSecureStorage')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async getSecureValue(
    @Path() key: string,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<{ value: JsonValue }> {
    const value = SecureStorageService.getSecureValue(key);

    if (!isDefined(value)) {
      return notFoundResponse(StatusCodes.NOT_FOUND, { reason: 'Key not found' });
    }

    return { value };

    // TODO:
    /**
     * Differences Identified:
     * Response Data Type:
     * SIDECAR returns a type defined as SecureStorageDataContract.
     * TARGET returns a JSON object directly.
     * Required Changes to TARGET:
     * Standardize Response Type:
     * Adjust TARGET to use SecureStorageDataContract for the response type to ensure type consistency.
     */
  }

  @Delete('{key}')
  @OperationId('deleteSecureStorage')
  @SuccessResponse(StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT)
  public async deleteSecureValue(@Path() key: string): Promise<void> {
    SecureStorageService.deleteSecureValue(key);
  }

  @Put('{key}')
  @OperationId('putSecureStorage')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async updateSecureValue(
    @Path() key: string,
    @Body() body: SetSecureStorageForKeyRequestBody
  ): Promise<string> {
    const { value } = body;
    SecureStorageService.setSecureValue(key, value);
    return value;
  }

  // TODO:
  /**
   * Differences Identified:
   * Request Body Type:
   * SIDECAR uses SecureStorageDataContract.
   * TARGET uses SetSecureStorageForKeyRequestBody.
   * Required Changes to TARGET:
   * Align Request Body Type:
   * Change the request body type in TARGET from SetSecureStorageForKeyRequestBody to SecureStorageDataContract to maintain type consistency across both APIs.
   */
}
