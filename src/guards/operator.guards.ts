import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new UnauthorizedException({
        msg: "Foydalanuvchi ro'yxatdan o'tmagan",
      });
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        msg: "Foydalanuvchi ro'yxatdan o'tmagan",
      });
    }
    let user: any;
    try {
      user = this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException({
        msg: "Foydalanuvchi ro'yxatdan o'tmagan",
      });
    }
    if (user.role != 'OPERATOR') {
      throw new UnauthorizedException({
        msg: 'Ruxsat etilmagan foydalanuvchi',
      });
    }
    req.user = user;
    return true;
  }
}
