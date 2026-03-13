import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { VoucherEntity } from '@/src/domain/entity/voucher.entity';

@Schema({ timestamps: true })
export class VoucherDocument
  extends Document
  implements Omit<VoucherEntity, 'id'>
{
  @Prop({ required: true, unique: true })
  code!: string;

  @Prop({
    required: true,
    type: String,
    enum: ['percentage', 'fixed'],
  })
  discountType!: 'percentage' | 'fixed'; // Match the literal type from Entity

  @Prop({ required: true })
  discountValue!: number;

  @Prop({ default: 0 })
  minOrderValue!: number;

  @Prop({ required: true })
  maxUses!: number;

  @Prop({ default: 0 })
  usedCount!: number;

  @Prop({ required: true })
  startDate!: Date;

  @Prop({ required: true })
  expirationDate!: Date;

  @Prop({ default: true })
  isActive!: boolean;
}

export const VoucherSchema = SchemaFactory.createForClass(VoucherDocument);
