import { User } from '@prisma/client';

import { Modelarize } from '../types/util';

export type UserModel = Modelarize<User>;
export type RawUser = User;
