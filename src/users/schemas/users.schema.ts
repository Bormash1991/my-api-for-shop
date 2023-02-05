import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
import { CreateUserDto } from '../dto/create-ures.dto';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  id: true,
})
export class User {
  @Prop({
    required: true,
    unique: true,
    dropDups: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  @Exclude()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
