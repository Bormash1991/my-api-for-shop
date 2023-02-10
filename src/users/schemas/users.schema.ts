import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  toJSON: {
    versionKey: false,
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class User {
  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Exclude()
  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
