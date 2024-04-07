import { OperationId, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Path, Put, Route, Tags } from 'tsoa';

import { EnvironmentService } from './environment.service';

import type { SetEnvironmentForKeyRequestBody } from 'domain/environment/environment.types';

@Route('test/environments')
@Tags('TestRoutes')
export class EnvironmentTestController {
  @Put('{name}')
  @OperationId('setEnvironmentTestRoute')
  @SuccessResponse(StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT)
  public async setEnvironmentForKey(
    @Path() name: string,
    @Body() body: SetEnvironmentForKeyRequestBody
  ): Promise<void> {
    const { value } = body;
    EnvironmentService.setEnvironmentForKey(name, value);
  }
}
