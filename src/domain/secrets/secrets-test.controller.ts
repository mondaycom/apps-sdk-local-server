import { OperationId, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Path, Put, Route, Tags } from 'tsoa';

import { SecretService } from './secrets.service';

import type { SetSecretForKeyRequestBody } from 'domain/secrets/secrets.types';

@Route('test/secrets')
@Tags('TestRoutes')
export class SecretsTestController {
  @Put('{name}')
  @OperationId('setSecretTestRoute')
  @SuccessResponse(StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT)
  public setSecretForKey(@Path() name: string, @Body() body: SetSecretForKeyRequestBody): void {
    const { value } = body;
    SecretService.setSecretForKey(name, value);
  }
}
