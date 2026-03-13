import { BaseRepositoryImpl } from '@/src/data/repository/base.repository.impl';
import { OrderEntity } from '@/src/domain/entity/order.entity';
import { OrderRepository } from '@/src/domain/repository/order.repository';


export class OrderRepositoryImpl
  extends BaseRepositoryImpl<OrderEntity>
  implements OrderRepository {
  constructor() {
    super('orders');
  }
}
