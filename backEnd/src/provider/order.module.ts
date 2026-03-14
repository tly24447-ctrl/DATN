// src/presentation/modules/order.module.ts

import {
  CreateOrderUseCase,
  DeleteOrderUseCase,
  GetAllOrdersUseCase,
  GetOrdersByPageUseCase,
  GetOrderUseCase,
  SearchOrdersUseCase,
  UpdateOrderUseCase,
} from '@/src/domain/use-case/order.use-case';
import { OrderController } from '@/src/presentation/controllers/order.controller';
import { DataServicesModule } from '@/src/provider/data-services.module';
import { Module } from '@nestjs/common';
import { VoucherModule } from './voucher.module';
import { ProductModule } from './product.module';

@Module({
  imports: [DataServicesModule, VoucherModule, ProductModule], // Provides OrderRepository implementation
  controllers: [OrderController],
  providers: [
    CreateOrderUseCase,
    GetAllOrdersUseCase,
    GetOrderUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
    GetOrdersByPageUseCase,
    SearchOrdersUseCase,
  ],
  exports: [
    CreateOrderUseCase,
    GetAllOrdersUseCase,
    GetOrderUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
    GetOrdersByPageUseCase,
    SearchOrdersUseCase,
  ],
})
export class OrderModule {}
