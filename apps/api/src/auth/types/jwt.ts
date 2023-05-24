export type JwtPayload = {
  sub: number;
  email: string;
  name: string;
};

export type Tokens = {
  refresh_token: string;
  access_token: string;
};

export type CurrentUserData = JwtPayload & { refreshToken: string };

export type GoogleUserData = Omit<JwtPayload, 'sub'>;
