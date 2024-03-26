import { SuccessResponse } from '@tsoa/runtime';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Path, Route, Tags } from 'tsoa';

import { EnvironmentService } from './environment.service';

@Route('environments')
@Tags('Environment')
export class EnvironmentController {
  @Get(':key')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async getEnvironmentForKey(@Path() key: string): Promise<unknown> {
    const value = EnvironmentService.getEnvironmentForKey(key);
    return value;
  }
}
