import { BaseRepositoryImpl } from '@/src/data/repository/base.repository.impl';
import { OrderRepository } from '@/src/domain/repository/order.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
import { OrderDocument } from '@/src/data/mongo/model/order.model';

@Injectable()
export class OrderRepositoryImpl
  extends BaseRepositoryImpl<OrderDocument>
  implements OrderRepository
{
  constructor(
    @InjectModel(OrderDocument.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {
    super(orderModel);
  }

  getFilter(searchRegex: RegExp): QueryFilter<OrderDocument> {
    return {
      $or: [
        // Search by the user ID (useful for admin lookup)
        { userId: { $regex: searchRegex } },

        // Search by the payment method (e.g., "PayPal", "Stripe")
        { paymentMethod: { $regex: searchRegex } },

        // Search inside the nested array for product names
        { 'orderItems.name': { $regex: searchRegex } },
      ],
    } as QueryFilter<OrderDocument>;
  }
}
