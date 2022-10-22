import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/createOrderRequest.dto';

@Injectable()
export class OrdersService {
  createOrder(request: CreateOrderRequest) {
    throw new Error('Method not implemented.');
  }
}
