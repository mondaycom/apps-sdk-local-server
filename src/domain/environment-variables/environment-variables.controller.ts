import { OperationId, Res, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Path, Route, Tags } from 'tsoa';

import { EnvironmentVariablesService } from './environment-variables.service';

import type { TsoaResponse } from '@tsoa/runtime';
import type { JsonDataContract } from 'types/general.type';

@Route('environment-variables')
@Tags('EnvironmentVariables')
export class EnvironmentVariablesController {
  @Get('{name}')
  @OperationId('getEnvironmentVariable')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async getEnvironmentVariableForKey(
    @Path() name: string,
    @Res() notFoundResponse: TsoaResponse<StatusCodes.NOT_FOUND, { reason: string }>
  ): Promise<JsonDataContract['value']> {
    const value = EnvironmentVariablesService.getEnvironmentVariableForKey(name);
    if (value === undefined) {
      return notFoundResponse(StatusCodes.NOT_FOUND, { reason: 'Environment variable not found' });
    }

    return value;
  }

  @Get()
  @OperationId('getEnvironmentVariableKeys')
  public async getKeys(): Promise<string[]> {
    const keys = EnvironmentVariablesService.getEnvironmentVariableKeys();
    return keys;
  }
}

// FIXME: in the sidecar, re-check env-vars and secrets are working after my fix to the "falsy" check
