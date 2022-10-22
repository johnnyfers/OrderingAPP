import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderRequest } from './dto/createOrderRequest.dto';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() request: CreateOrderRequest){
    return this.ordersService.createOrder(request)
  }
}
