import { SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Path, Put, Route, Tags } from 'tsoa';

import { SecretService } from './secrets.service';

import type { SetSecretForKeyRequestBody } from 'domain/secrets/secrets.types';

@Route('test/secrets')
@Tags('Test Routes')
export class SecretsTestController {
  @Put(':key')
  @SuccessResponse(StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT)
  public setSecretForKey(@Path() key: string, @Body() body: SetSecretForKeyRequestBody): void {
    const { value } = body;
    SecretService.setSecretForKey(key, value);
  }
}
