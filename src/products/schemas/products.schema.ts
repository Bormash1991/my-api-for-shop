import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StringSupportOption } from 'prettier';
import { v4 as uuidv4 } from 'uuid';
export type ProductsDocument = Product & Document;
interface Comment {
  text: string;
  username: string;
  userId: string;
  stars: number;
  _id: typeof uuidv4;
}

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
export class Product {
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  price: number;
  @Prop({
    required: true,
  })
  quantity: number;
  @Prop({
    required: true,
  })
  description: string;
  @Prop()
  authorEmail: string;
  @Prop({
    required: true,
  })
  guarantee: string;

  @Prop({
    required: true,
  })
  images: string[];
  @Prop({
    required: true,
  })
  color: string;
  @Prop({
    required: true,
  })
  cssColor: string;
  @Prop()
  otherIds: string[];

  @Prop({
    type: [
      {
        text: { type: String, required: true },
        username: { type: String, required: true },
        userId: { type: String, required: true },
        stars: { type: Number, required: true },
        _id: { type: String, required: true },
      },
    ],
  })
  comments: Array<Comment>;
}
export const ProductsSchema = SchemaFactory.createForClass(Product);
