import { AuthGuard } from '@nestjs/passport';

import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { PUBLIC } from '../decorators/public.decorator';
import { JWT_ACCESS_GUARD } from '../strategies/access-token.strategy';

@Injectable()
export class AccessTokenGuard extends AuthGuard(JWT_ACCESS_GUARD) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride(PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
