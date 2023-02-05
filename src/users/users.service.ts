import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-ures.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.model.create(dto);
    return user;
  }
  async getAllUsers() {
    const users = await this.model.find();
    return users;
  }
}
