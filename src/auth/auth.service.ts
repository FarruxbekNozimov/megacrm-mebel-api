import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { StaffService } from '../staff/staff.service';
import { LoginDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly staffService: StaffService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto, res: Response) {
    const { login, password } = loginDto;
    const staff = await this.staffService.findOneLogin(login);
    if (!staff) {
      throw new HttpException(
        { msg: `Bunday ishchi yo'q !!!` },
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatchPass = await bcrypt.compare(password, staff.password);
    if (!isMatchPass) {
      throw new UnauthorizedException({
        msg: `Parol yoki Login xato kiritilgan !!!`,
      });
    }
    const tokens = await this.getToken(staff.id, staff.role, staff.is_active);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedUser = await this.staffService.update(staff.id, {
      hashed_token: hashed_refresh_token,
    });

    res.cookie('token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      status: 200,
      msg: 'Muvaffaqiyatli kirdingiz',
      staff: updatedUser,
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException({ msg: "Bunday ishchi tizimda yo'q !!!" });
    }
    const updatedUser = await this.staffService.update(userData.id, {
      hashed_token: refreshToken,
    });
    res.clearCookie('token');
    const response = {
      msg: 'Muvaffaqiyatli tizimdan chiqdingiz',
      staff: updatedUser,
    };
    return response;
  }

  private async getToken(id: string, role: string, is_active: boolean) {
    const payload = {
      id,
      role,
      is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);

    if (user_id != decodedToken['id']) {
      throw new BadRequestException({ msg: 'Bunday ishchi topilmadi' });
    }

    const staff = await this.staffService.findOne(`${user_id}`);
    if (!staff || !staff.password) {
      throw new BadRequestException({ msg: 'Bunday ishchi topilmadi' });
    }

    const tokenMatch = await bcrypt.compare(refreshToken, staff.password);
    const tokens = await this.getToken(staff.id, staff.role, staff.is_active);

    const refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.staffService.update(staff.id, {
      hashed_token: refresh_token,
    });
    return updatedUser;
  }

  async getUser(token: string, res: Response) {
    const decodedToken = this.jwtService.verify(token['token'], {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const staff = await this.staffService.findOne(`${decodedToken.id}`);
    if (!staff) {
      throw new BadRequestException({ msg: 'Bunday ishchi topilmadi' });
    }
    return staff;
  }
}
