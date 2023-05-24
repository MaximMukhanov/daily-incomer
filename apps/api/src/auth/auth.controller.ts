import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Request } from 'express';

import { ExtendObject } from '../globals/types/util';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { GetCurrentUser } from './decorators/user.decorator';
import { AuthDto } from './dto/auth.dto';
import { GoogleAuthGuard } from './guards/google.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { CurrentUserData, GoogleUserData, Tokens } from './types/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google/login')
  @Public()
  @UseGuards(GoogleAuthGuard)
  @HttpCode(HttpStatus.OK)
  async handleGoogleSignup(): Promise<void> {
    return;
  }

  @Get('google/redirect')
  @Public()
  @UseGuards(GoogleAuthGuard)
  @HttpCode(HttpStatus.OK)
  async handleRedirect(
    @Req() req: ExtendObject<Request, 'user', GoogleUserData>
  ) {
    return this.authService.handleGoogleAuth(req.user);
  }

  @Post('local/signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Local Signin method' })
  @ApiResponse({ status: HttpStatus.OK })
  async handleLocalSignin(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.handleLocalSignin(dto);
  }

  @Post('local/signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Local Signup method' })
  @ApiResponse({ status: HttpStatus.CREATED })
  async handleLocalSignup(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.handleLocalSignup(dto);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout method' })
  async handleSignout(
    @GetCurrentUser() { sub }: CurrentUserData
  ): Promise<void> {
    return this.authService.handleSignout(sub);
  }

  @Post('refresh')
  @Public()
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh method' })
  async handleTokenRefresh(
    @GetCurrentUser() { sub, refreshToken }: CurrentUserData
  ): Promise<Tokens> {
    return this.authService.handleTokenRefresh(sub, refreshToken);
  }
}
