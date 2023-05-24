import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from '@node-rs/bcrypt';

import { DatabaseService } from '../database/database.service';
import { AuthDto } from './dto/auth.dto';
import { GoogleUserData, JwtPayload, Tokens } from './types/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService
  ) {}

  hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  compareHash(hash: string, data: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }

  async updateUserToken(userId: number, refreshToken: string): Promise<void> {
    try {
      const hashedRefreshToken = await this.hashData(refreshToken);
      await this.databaseService.user.update({
        where: { id: userId },
        data: { refreshToken: hashedRefreshToken },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async signUser({ sub, email, name }: JwtPayload): Promise<Tokens> {
    try {
      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(
          {
            sub,
            email,
            name,
          },
          {
            secret: process.env.JWT_ACCESS_SECRET,
            // 10 минут
            expiresIn: 60 * 10,
          }
        ),
        this.jwtService.signAsync(
          {
            sub,
            email,
            name,
          },
          {
            secret: process.env.JWT_REFRESH_SECRET,
            // 7 дней
            expiresIn: 60 * 60 * 24 * 7,
          }
        ),
      ]);

      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }

  async handleLocalSignin(dto: AuthDto) {
    try {
      const { email, password } = dto;
      const maybeUser = await this.databaseService.user.findUnique({
        where: { email },
      });

      if (!maybeUser) {
        throw new ForbiddenException('Access Denied');
      }

      const maybePasswordMatches = await this.compareHash(
        maybeUser.password,
        password
      );

      if (!maybePasswordMatches) {
        throw new ForbiddenException('Access Denied');
      }

      const tokens = await this.signUser({
        sub: maybeUser.id,
        email,
        name: maybeUser.name,
      });

      await this.updateUserToken(maybeUser.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
  async handleGoogleAuth(user: GoogleUserData) {
    try {
      console.log(user);
      const { email, name } = user;
      let sub: number;
      const maybeUser = await this.databaseService.user.findUnique({
        where: { email },
      });

      if (maybeUser) {
        sub = maybeUser.id;
        const tokens = await this.signUser({ sub, email, name });
        await this.updateUserToken(sub, tokens.refresh_token);

        return tokens;
      } else {
        const newUser = await this.databaseService.user.create({
          data: {
            name,
            email,
          },
        });
        sub = newUser.id;
        const tokens = await this.signUser({ sub, email, name });
        await this.updateUserToken(sub, tokens.refresh_token);

        return tokens;
      }
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
  /**
   * @method **handlieLocalSignup**
   * Регистрирует пользователя
   *
   * @param { AuthDto } dto Данные авторизации
   * @returns { Promise<Tokens> } tokens **Refresh** и **Access** токены
   */
  async handleLocalSignup(dto: AuthDto): Promise<Tokens> {
    try {
      const { password, email, name } = dto;
      const maybeUserExists = await this.databaseService.user.findUnique({
        where: { email },
      });

      if (maybeUserExists) {
        throw new ConflictException();
      }

      const hashedPassword = await this.hashData(password);
      const newUser = await this.databaseService.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      const tokens = await this.signUser({
        sub: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });

      await this.updateUserToken(newUser.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async handleSignout(userId: number): Promise<void> {
    try {
      await this.databaseService.user.updateMany({
        where: {
          id: userId,
          refreshToken: {
            not: null,
          },
        },
        data: {
          refreshToken: null,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async handleTokenRefresh(userId: number, refreshToken: string) {
    try {
      const maybeUser = await this.databaseService.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!maybeUser) {
        throw new ForbiddenException();
      }
      const isValidRefreshToken = await this.compareHash(
        maybeUser.refreshToken,
        refreshToken
      );

      if (!isValidRefreshToken) {
        throw new ForbiddenException();
      }

      const tokens = await this.signUser({
        sub: maybeUser.id,
        name: maybeUser.name,
        email: maybeUser.email,
      });

      await this.updateUserToken(maybeUser.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
