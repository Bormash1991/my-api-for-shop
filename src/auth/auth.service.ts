import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/create-ures.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from '../users/dto/login-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }
  private async validateUser(dto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Incorrect password or email',
      });
    }
    const passwordEquals = await bcrypt.compare(dto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Incorrect password or email',
    });
  }
  async registration(dto: CreateUserDto) {
    const regUser = await this.usersService.getUserByEmail(dto.email);
    if (regUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser({
      ...dto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }
  private async generateToken(user: any) {
    const payload = {
      username: user.username,
      email: user.email,
      id: user._id,
      role: user.role,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
