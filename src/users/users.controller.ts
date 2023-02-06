import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-ures.dto';
import { UsersService } from './users.service';
import { Role } from 'src/auth/role-auth.decorator';
import { RoleAuthGuard } from 'src/auth/role.guard';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
  @Role('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(RoleAuthGuard)
  @Role('ADMIN')
  @Patch('/role/:id')
  changeRole(@Param('id') id: string, @Body() updRoleDto: UpdateRoleDto) {
    return this.usersService.changeRoleForUser(id, updRoleDto);
  }
}
