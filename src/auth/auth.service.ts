import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/create-ures.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }
  private async validateUser(dto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некоректний палорль або email',
    });
  }
  async registration(dto: CreateUserDto) {
    const regUser = await this.usersService.getUserByEmail(dto.email);
    if (regUser) {
      throw new HttpException('Користувач уже існує', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser({
      ...dto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }
  private async generateToken(user: any) {
    const payload = { email: user.email, id: user._id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
