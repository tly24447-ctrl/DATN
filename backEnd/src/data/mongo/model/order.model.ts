import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderItem, OrderEntity } from '@/src/domain/entity/order.entity';

@Schema({ _id: false })
class OrderItemDocument implements OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'ProductDocument', required: true })
  productId!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  amount!: number;

  @Prop()
  image!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ default: 0 })
  discount!: number;
}

@Schema({ timestamps: true })
export class OrderDocument extends Document implements Omit<OrderEntity, 'id'> {
  @Prop({ type: String, ref: 'UserDocument', required: true })
  userId!: string;

  @Prop({ type: Types.ObjectId, ref: 'VoucherDocument' })
  voucherId?: string;

  @Prop({
    type: [SchemaFactory.createForClass(OrderItemDocument)],
    required: true,
  })
  orderItems!: OrderItem[];

  @Prop({ required: true })
  paymentMethod!: string;

  @Prop({ required: true, default: 0 })
  itemsPrice!: number;

  @Prop({ required: true, default: 0 })
  shippingPrice!: number;

  @Prop({ required: true, default: 0 })
  totalPrice!: number;

  @Prop({ required: true, default: true })
  isCart!: boolean;

  // Thêm trường vnPayId để lưu mã giao dịch hoặc mã tra cứu từ VNPay
  @Prop({ type: String })
  vnPayId?: string;

  @Prop({ default: false })
  isPaid!: boolean;

  @Prop()
  paidAt?: Date;

  @Prop({ default: false })
  isDelivered!: boolean;

  @Prop({ default: false })
  isCancelled!: boolean;

  @Prop()
  deliveredAt?: Date;

  // Timestamps sẽ tự động tạo createdAt và updatedAt
  createdAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument);
