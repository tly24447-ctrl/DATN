import { OrderItem } from '@/src/domain/entity/order.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
class OrderItemSchema {
  @Prop({ type: Types.ObjectId, ref: 'ProductDocument', required: true })
  product!: Types.ObjectId;

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
export class OrderDocument extends Document {
  @Prop({ type: String, ref: 'UserDocument', required: true }) // Matches Firebase UID String
  user!: string;

  @Prop({ type: Types.ObjectId, ref: 'VoucherDocument' })
  voucher?: Types.ObjectId;

  @Prop({ type: [OrderItemSchema], required: true })
  orderItems!: OrderItem[];

  @Prop({ required: true })
  paymentMethod!: string;

  @Prop({ required: true, default: 0 })
  itemsPrice!: number;

  @Prop({ required: true, default: 0 })
  shippingPrice!: number;

  @Prop({ required: true, default: 0 })
  totalPrice!: number;

  @Prop({ default: false })
  isPaid!: boolean;

  @Prop()
  paidAt?: Date;

  @Prop({ default: false })
  isDelivered!: boolean;

  @Prop()
  deliveredAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument);
