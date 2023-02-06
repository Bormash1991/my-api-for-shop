import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-ures.dto';
import { Model } from 'mongoose';
import { UpdateRoleDto } from './dto/update-role.dto';

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
      { role: updRoleDto.value },
    );
    return user;
  }
}
