import { OperationId, Res, SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Path, Route, Tags } from 'tsoa';

import { EnvironmentService } from './environment.service';

import type { TsoaResponse } from '@tsoa/runtime';

@Route('environments')
@Tags('Environment')
export class EnvironmentController {
  @Get('{name}')
  @OperationId('getEnvironment')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async getEnvironmentForKey(
    @Path() name: string,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<unknown> {
    const value = EnvironmentService.getEnvironmentForKey(name);
    if (!value) {
      return notFoundResponse(404, { reason: 'Environment variable not found' });
    }

    return value;
  }
}
