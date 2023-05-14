import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StaffService } from '../staff/staff.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly staffService: StaffService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new UnauthorizedException({
        msg: "Foydalanuvchi avtorizatsiyadan o'tmagan !!!",
      });
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        msg: "Foydalanuvchi avtorizatsiyadan o'tmagan !!!",
      });
    }
    let user: any;
    try {
      user = this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException({
        msg: "Foydalanuvchi avtorizatsiyadan o'tmagan !!!",
      });
    }
    const userData = await this.staffService.findOne(user._id);
    if (userData.is_active) {
      throw new UnauthorizedException({
        msg: 'SUPER ADMIN(1) lavozimi sizga berilmagan !!!',
      });
    }
    req.user = user;
    return true;
  }
}
