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
  vnPayId?: string;
  isPaid!: boolean;
  paidAt?: Date;
  isDelivered!: boolean;
  isCancelled?: boolean;
  deliveredAt?: Date;
  createdAt?: Date;
}
