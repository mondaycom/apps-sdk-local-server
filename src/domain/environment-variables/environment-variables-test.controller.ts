import { OperationId, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Path, Put, Route, Tags } from 'tsoa';

import { EnvironmentVariablesService } from './environment-variables.service';

import type { JsonDataContract } from 'types/general.type';

@Route('test/environments')
@Tags('TestRoutes')
export class EnvironmentVariablesTestController {
  @Put('{name}')
  @OperationId('setEnvironmentTestRoute')
  @SuccessResponse(StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT)
  public async setEnvironmentForKey(@Path() name: string, @Body() body: JsonDataContract): Promise<void> {
    const { value } = body;
    EnvironmentVariablesService.setEnvironmentVariableForKey(name, value);
  }
}

// TODO: what is this? needed?
