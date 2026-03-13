// src/domain/entity/order.entity.ts

export class OrderItem {
  productId!: string;
  name!: string;
  amount!: number;
  image!: string;
  price!: number;
  discount?: number;
}

export class OrderEntity {
  id?: string;
  userId!: string;
  voucherId?: string;
  orderItems!: OrderItem[];
  paymentMethod!: string;
  itemsPrice!: number;
  shippingPrice!: number;
  totalPrice!: number;
  isCart!: boolean;
  isPaid!: boolean;
  paidAt?: Date;
  isDelivered!: boolean;
  deliveredAt?: Date;
  createdAt?: Date;
}
