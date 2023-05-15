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
    console.log(req);
    const authHeader = req.headers.authorization;
    console.log(req, authHeader);
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
    const userData = await this.staffService.findOne(user.id);
    if (!userData.is_active) {
      throw new UnauthorizedException({
        msg: 'Siz hali aktiv emassiz !!!',
      });
    }
    req.user = user;
    return true;
  }
}
