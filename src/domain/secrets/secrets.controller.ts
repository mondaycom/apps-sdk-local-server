import { OperationId, Res, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Path, Route, Tags } from 'tsoa';

import { SecretService } from './secrets.service';

import type { TsoaResponse } from '@tsoa/runtime';

@Route('secrets')
@Tags('Secret')
export class SecretsController {
  @Get('{name}')
  @OperationId('getSecret')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public getSecretForKey(@Path() name: string, @Res() notFoundResponse: TsoaResponse<404, { reason: string }>): string {
    const secret = SecretService.getSecretForKey(name);
    if (!secret) {
      return notFoundResponse(404, { reason: 'Secret not found' });
    }

    return secret;
  }
}
