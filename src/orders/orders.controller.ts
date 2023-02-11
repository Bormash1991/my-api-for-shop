import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Patch,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role-auth.decorator';
import { RoleAuthGuard } from 'src/auth/role.guard';
import { OrderDto } from './dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Role('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Get()
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getOrderByUser(@Request() req: any) {
    return this.ordersService.getOrderByUserId(req);
  }
  @Role('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Get('/:id')
  getOrdersById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Body() orderDto: OrderDto, @Request() req: any) {
    return this.ordersService.createOrder(orderDto, req);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateByUser(
    @Param('id') id: string,
    @Body() updDto: any,
    @Request() req: any,
  ) {
    return this.ordersService.updateOrderByUser(id, updDto, req);
  }
  @Role('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Patch('admin/:id')
  updateByAdmin(@Param('id') id: string, @Body() updDto: OrderDto) {
    return this.ordersService.updateOrderByAdmin(id, updDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteByUser(@Param('id') id: string, @Request() req: any) {
    return this.ordersService.deleteOrderByUser(id, req);
  }
  @Role('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Delete('admin/:id')
  deleteByAdmin(@Param('id') id: string) {
    return this.ordersService.deleteOrderByAdmin(id);
  }
}
