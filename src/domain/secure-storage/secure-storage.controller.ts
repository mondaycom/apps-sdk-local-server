import { SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Delete, Get, Path, Put, Route, Tags } from 'tsoa';

import { SecureStorageService } from './secure-storage.service';

import type { SetSecureStorageForKeyRequestBody } from 'domain/secure-storage/secure-storage.types';
import type { JsonValue } from 'types/general.type';

@Route('secure-storage')
@Tags('Secure Storage')
export class SecureStorageController {
  @Get(':key')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async getSecureValue(@Path() key: string): Promise<{ value: JsonValue }> {
    const value = SecureStorageService.getSecureValue(key);
    return { value };
  }

  @Delete(':key')
  @SuccessResponse(StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT)
  public async deleteSecureValue(@Path() key: string): Promise<void> {
    SecureStorageService.deleteSecureValue(key);
  }

  @Put(':key')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async updateSecureValue(
    @Path() key: string,
    @Body() body: SetSecureStorageForKeyRequestBody
  ): Promise<string> {
    const { value } = body;
    SecureStorageService.setSecureValue(key, value);
    return value;
  }
}
