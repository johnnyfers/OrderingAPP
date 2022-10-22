import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constants/services';
import { CreateOrderRequest } from './dto/createOrderRequest.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {

  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE)
    private readonly billingClient: ClientProxy
  ) { }

  async createOrder(request: CreateOrderRequest) {
    const session = await this.ordersRepository.startTransaction()
    try {
      const order = await this.ordersRepository.create(request, { session })
      await lastValueFrom(this.billingClient.emit('order_created', { order }))
      await session.commitTransaction()

      return order
    } catch (e) {
      await session.abortTransaction()
    }
  }

  async getOrders() {
    return this.ordersRepository.find({})
  }
}
