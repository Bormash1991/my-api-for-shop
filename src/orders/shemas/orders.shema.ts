import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type OrdersDocument = Order & Document;

interface OrderDetails {
  text: string;
  name: string;
  productId: string;
  quantity: number;
  _id: string;
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
export class Order {
  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  phone: string;

  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    required: true,
    type: [
      {
        text: { type: String, required: true },
        name: { type: String, required: true },
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        _id: { type: String, required: true },
      },
    ],
  })
  order: Array<OrderDetails>;
}
export const OrdersSchema = SchemaFactory.createForClass(Order);
