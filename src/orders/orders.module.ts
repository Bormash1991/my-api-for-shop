import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrdersSchema } from './shemas/orders.shema';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrdersSchema,
      },
    ]),
    AuthModule,
  ],
})
export class OrdersModule {}
