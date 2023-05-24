import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetCurrentUser = createParamDecorator(
  (context: ExecutionContext) => {
    return context.switchToHttp().getRequest<Request>().user;
  }
);
