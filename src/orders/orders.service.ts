import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrdersDocument } from './shemas/orders.shema';
import { Model } from 'mongoose';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private model: Model<OrdersDocument>) {}

  async getAllOrders() {
    const orders = await this.model.find();
    return orders;
  }
  async getOrdersSByUserId(req: any) {
    const order = await this.model.find({ userId: req.user.id });
    return order;
  }
  async getOrderById(id: string) {
    const orders = await this.model.find({ _id: id });
    return orders;
  }
  async createOrder(orderDto: OrderDto, req: any) {
    const order = await this.model.create({ ...orderDto, userId: req.user.id });
    return order;
  }
  async updateOrderByUser(id: string, updDto: OrderDto, req: any) {
    const checkOrder = await this.getOrderById(id);
    if (checkOrder[0].userId === req.user.id) {
      const order = await this.model.findByIdAndUpdate(id, updDto);
      return order;
    }
    throw new HttpException('No access', HttpStatus.BAD_REQUEST);
  }
  async updateOrderByAdmin(id: string, updDto: OrderDto) {
    const order = await this.model.findByIdAndUpdate(id, updDto);
    return order;
  }
  async deleteOrderByUser(id: string, req: any) {
    const checkOrder = await this.getOrderById(id);
    if (checkOrder[0].userId === req.user.id) {
      const order = await this.model.findByIdAndRemove(id);
      return order;
    }
    throw new HttpException('No access', HttpStatus.BAD_REQUEST);
  }
  async deleteOrderByAdmin(id: string) {
    const order = await this.model.findByIdAndRemove(id);
    return order;
  }
}
