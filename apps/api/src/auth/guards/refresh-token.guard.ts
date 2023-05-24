import { AuthGuard } from '@nestjs/passport';

import { JWT_REFRESH_GUARD } from '../strategies/refresh-token.strategy';

export class RefreshTokenGuard extends AuthGuard(JWT_REFRESH_GUARD) {
  constructor() {
    super();
  }
}
