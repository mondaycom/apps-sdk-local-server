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
    @Res() notFoundResponse: TsoaResponse<StatusCodes.NOT_FOUND, { reason: string }>
  ): Promise<{ value: JsonValue }> {
    const value = SecureStorageService.getSecureValue(key);

    if (!isDefined(value)) {
      return notFoundResponse(StatusCodes.NOT_FOUND, { reason: 'Key not found' });
    }

    return { value };
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
  ): Promise<boolean> {
    const { value } = body;
    SecureStorageService.setSecureValue(key, value);
    return true;
  }
}
