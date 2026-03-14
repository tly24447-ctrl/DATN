// src/domain/use-case/order/order.use-case.ts

import { OrderEntity } from '@/src/domain/entity/order.entity';
import { OrderRepository } from '@/src/domain/repository/order.repository';
import { PaginatedResult } from '@/src/domain/entity/paginated.result';
import { Constants } from '@/src/shared/constans';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { GetVoucherUseCase, UpdateVoucherUseCase } from './voucher.use-case';
import { GetProductUseCase, UpdateProductUseCase } from './product.use-case';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly orderRepository: OrderRepository,
    private readonly updateVoucherUseCase: UpdateVoucherUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly getVoucherUseCase: GetVoucherUseCase,
  ) {}

  async execute(order: OrderEntity): Promise<OrderEntity> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      // 1. Cập nhật Kho hàng và Doanh số (Product Stock & Selled)
      for (const item of order.orderItems) {
        // Lấy sản phẩm hiện tại với session để đảm bảo tính nhất quán dữ liệu
        const product = await this.getProductUseCase.execute(
          item.productId,
          session,
        );

        if (!product) {
          throw new Error(`Product ${item.name} not found`);
        }

        const newStock = (product.countInStock || 0) - item.amount;
        const newSelled = (product.selled || 0) + item.amount;

        if (newStock < 0) {
          throw new Error(`Insufficient stock for ${item.name}`);
        }

        // Cập nhật Product với session
        await this.updateProductUseCase.execute(
          item.productId,
          { countInStock: newStock, selled: newSelled },
          session,
        );

        console.log(
          `[Transaction] Updated for ${item.name}: Stock=${newStock}, Selled=${newSelled}`,
        );
      }

      // 2. Cập nhật số lần sử dụng Voucher
      if (order.voucherId) {
        // Giả định bạn lấy voucher để kiểm tra count hiện tại
        const voucher = await this.getVoucherUseCase.execute(
          order.voucherId,
          session,
        );

        if (voucher) {
          const currentCount = voucher.usedCount || 0;
          await this.updateVoucherUseCase.execute(
            order.voucherId,
            { usedCount: currentCount + 1 },
            session,
          );
          console.log(
            `[Transaction] Voucher ${order.voucherId} updated to ${currentCount + 1}`,
          );
        }
      }

      // 3. Tạo đơn hàng (Order Creation)
      // Truyền session vào repo.create để nó thuộc về transaction này
      const createdOrder = await this.orderRepository.create(order, session);

      // Nếu mọi thứ thành công, xác nhận thay đổi
      await session.commitTransaction();
      console.log(
        `[Transaction] Order ${createdOrder.id} created successfully.`,
      );

      return createdOrder;
    } catch (error) {
      // Nếu có bất kỳ lỗi nào, hủy bỏ toàn bộ thay đổi (Rollback)
      await session.abortTransaction();
      console.error(
        '[Transaction] Order creation failed, rolling back...',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.message,
      );
      throw error;
    } finally {
      // Kết thúc phiên làm việc
      await session.endSession();
    }
  }
}

@Injectable()
export class GetAllOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<OrderEntity[]> {
    return this.orderRepository.findAll();
  }
}

@Injectable()
export class GetOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }
}

@Injectable()
export class UpdateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    id: string,
    data: Partial<OrderEntity>,
  ): Promise<OrderEntity | null> {
    const updated = await this.orderRepository.update(id, data);
    if (!updated) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updated;
  }
}

@Injectable()
export class DeleteOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.orderRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Order with ID ${id} could not be deleted`);
    }
    return deleted;
  }
}

@Injectable()
export class GetOrdersByPageUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    page: number = Constants.PAGE,
    limit: number = Constants.LIMIT,
  ): Promise<PaginatedResult<OrderEntity>> {
    return this.orderRepository.findByPage(page, limit);
  }
}

@Injectable()
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
