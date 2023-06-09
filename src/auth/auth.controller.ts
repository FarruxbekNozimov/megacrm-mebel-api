import { Controller, Post, Body, HttpCode, Res, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Get User by token' })
  @HttpCode(200)
  @Post('getuser')
  getUser(@Body() token: string, @Res({ passthrough: true }) res: Response) {
    return this.authService.getUser(token, res);
  }
  
  @ApiOperation({ summary: 'Login User' })
  @HttpCode(200)
  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto, res);
  }

  @ApiOperation({ summary: 'Logout User' })
  @HttpCode(200)
  @Post('logout')
  logout(
    @CookieGetter('token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(refreshToken, res);
  }

  @Post(':id/refresh')
  refresh(
    @Param('id') id: number,
    @CookieGetter('token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(+id, refreshToken, res);
  }
}
