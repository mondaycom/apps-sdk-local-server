import { SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Path, Route, Tags } from 'tsoa';

import { SecretService } from './secrets.service';

@Route('secrets')
@Tags('Secrets')
export class SecretsController {
  @Get(':key')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public getSecretForKey(@Path() key: string): string {
    return SecretService.getSecretForKey(key);
  }
}
