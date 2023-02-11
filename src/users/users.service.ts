import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-ures.dto';
import { Model } from 'mongoose';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserByAdmDto } from './dto/update-userByAdm.dto';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.model.create({ ...dto, role: 'USER' });
    return user;
  }
  async getAllUsers() {
    const users = await this.model.find();
    return users;
  }
  async getUserByEmail(email: string) {
    const user = await this.model.findOne({ email: email });
    return user;
  }

  async changeRoleForUser(id: string, updRoleDto: UpdateRoleDto) {
    const user = await this.model.findByIdAndUpdate(
      { _id: id },
      { role: updRoleDto.role },
    );
    return user;
  }

  async changeUserByUser(id: string, updUserDto: UpdateUserDto) {
    const user = await this.model.findById(id);
    const passwordEquals = await bcrypt.compare(
      updUserDto.password,
      user.password,
    );
    if (!passwordEquals) {
      throw new UnauthorizedException({
        message: 'Incorrect password',
      });
    }
    if (user && passwordEquals) {
      let pass: string = '';
      if (!updUserDto.newPassword) {
        pass = user.password;
      } else {
        pass = await bcrypt.hash(updUserDto.newPassword, 5);
      }

      const updateUser = await this.model.findByIdAndUpdate(
        { _id: id },
        {
          ...updUserDto,
          password: pass,
          role: user.role,
        },
      );
      return updateUser;
    }
    return user;
  }
  async changeUserByAdmin(id: string, updUserDto: UpdateUserByAdmDto) {
    const pass = await bcrypt.hash(updUserDto.password, 5);
    const user = await this.model.findByIdAndUpdate(
      { _id: id },
      {
        ...updUserDto,
        password: pass,
      },
    );
    return user;
  }
  async deleteUser(id: string) {
    const user = await this.model.findByIdAndRemove(id);
    return user;
  }
}
