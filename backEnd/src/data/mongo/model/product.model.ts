import * as productEntity from '@/src/domain/entity/product.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// 1. Định nghĩa Schema cho chi tiết từng đánh giá
@Schema({ _id: false })
class RatingDetailDocument implements productEntity.RatingDetail {
  @Prop({ required: true })
  userId!: string;

  @Prop()
  userName?: string;

  @Prop()
  avatar?: string;

  @Prop({ required: true, min: 1, max: 5 })
  score!: number;

  @Prop()
  comment?: string; // Thêm cột comment trong DB

  @Prop({ default: Date.now })
  createdAt!: Date;
}
const RatingDetailSchema = SchemaFactory.createForClass(RatingDetailDocument);

// 2. Định nghĩa Schema cho thông tin tổng hợp Rating
@Schema({ _id: false })
class RatingInfoDocument implements productEntity.RatingInfo {
  @Prop({ default: 0 })
  average!: number;

  @Prop({ default: 0 })
  count!: number;

  @Prop({ type: [RatingDetailSchema], default: [] })
  details!: productEntity.RatingDetail[];
}
const RatingInfoSchema = SchemaFactory.createForClass(RatingInfoDocument);

@Schema({ timestamps: true })
export class ProductDocument
  extends Document
  implements Omit<productEntity.ProductEntity, 'id'>
{
  @Prop({ type: Types.ObjectId, ref: 'CategoryDocument', required: true })
  categoryId!: string;

  @Prop({ required: true, unique: true })
  name!: string;

  @Prop()
  image?: string;

  @Prop({ required: true })
  author!: string;

  @Prop()
  publisher?: string;

  @Prop()
  publicationDate?: Date;

  @Prop({ unique: true, sparse: true })
  isbn?: string;

  @Prop()
  pageCount?: number;

  @Prop()
  language?: string;

  @Prop({
    type: String,
    enum: ['Paperback', 'Hardcover', 'E-book'],
    default: 'Paperback',
  })
  format!: 'Paperback' | 'Hardcover' | 'E-book';

  @Prop({ required: true, default: 0 })
  price!: number;

  @Prop({ required: true, default: 0 })
  countInStock!: number;

  // 3. Thay thế rating: number bằng ratingInfo phức hợp
  @Prop({ type: RatingInfoSchema, default: () => ({}) })
  rating?: productEntity.RatingInfo;

  @Prop()
  description?: string;

  @Prop({ default: 0 })
  discount!: number;

  @Prop({ default: 0 })
  selled!: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);
