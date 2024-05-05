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

// TODO:
/**
 * Required Changes to TARGET:
 * Add Missing Endpoint:
 * Implement the /secrets GET endpoint in TARGET to retrieve all secret keys.
 * Define the operation as getSecretKeys with a 200 response returning an array of strings, similar to SIDECAR.
 */
