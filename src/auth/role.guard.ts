import { ROLE_KEY } from './role-auth.decorator';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const RequariedRole = this.reflector.getAllAndOverride(ROLE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!RequariedRole) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Not authorized',
        });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      if (user.role === RequariedRole) {
        return true;
      }
      throw new HttpException('No access', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException('No access', HttpStatus.BAD_REQUEST);
    }
  }
}
