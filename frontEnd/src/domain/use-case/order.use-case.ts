// src/domain/use-case/order/order.use-case.ts

import { OrderEntity } from '@/src/domain/entity/order.entity';
import { PaginatedResult } from '@/src/domain/entity/paginated.result';
import { OrderRepository } from '@/src/domain/repository/order.repository';
import { Constants } from '@/src/shared/constans';

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(order: OrderEntity): Promise<OrderEntity> {
    // You could add logic here to validate stock or voucher validity
    return this.orderRepository.create(order);
  }
}


export class GetAllOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<OrderEntity[]> {
    return this.orderRepository.findAll();
  }
}


export class GetOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return order;
  }
}


export class UpdateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    id: string,
    data: Partial<OrderEntity>,
  ): Promise<OrderEntity | null> {
    const updated = await this.orderRepository.update(id, data);
    if (!updated) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return updated;
  }
}


export class DeleteOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.orderRepository.delete(id);
    if (!deleted) {
      throw new Error(`Order with ID ${id} could not be deleted`);
    }
    return deleted;
  }
}


export class GetOrdersByPageUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    page: number = Constants.PAGE,
    limit: number = Constants.LIMIT,
  ): Promise<PaginatedResult<OrderEntity>> {
    return this.orderRepository.findByPage(page, limit);
  }
}


export class SearchOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    query: string,
    page: number = Constants.PAGE,
    limit: number = Constants.LIMIT,
  ): Promise<PaginatedResult<OrderEntity>> {
    return this.orderRepository.search(query, page, limit);
  }
}
