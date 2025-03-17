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
  public async getSecretForKey(
    @Path() name: string,
    @Res()
    notFoundResponse: TsoaResponse<
      StatusCodes.NOT_FOUND,
      {
        reason: string;
      }
    >
  ): Promise<string> {
    const secret = SecretService.getSecretForKey(name);
    if (!secret) {
      return notFoundResponse(StatusCodes.NOT_FOUND, { reason: 'Secret not found' });
    }

    return secret;
  }

  @Get()
  @OperationId('getSecretKeys')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async getKeys(): Promise<string[]> {
    const keys = SecretService.getSecretKeys();
    return keys;
  }
}
