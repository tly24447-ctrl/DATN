import { BaseRepository } from '@/src/domain/repository/base.repository';
import { OrderEntity } from '@/src/domain/entity/order.entity';

export abstract class OrderRepository extends BaseRepository<OrderEntity> {}
