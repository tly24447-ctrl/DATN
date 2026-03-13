import { ProductEntity } from '@/src/domain/entity/product.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ProductDocument
  extends Document
  implements Omit<ProductEntity, 'id'>
{
  // Renamed from 'category' to 'categoryId' to match ProductEntity
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

  @Prop({ default: 0 })
  rating!: number;

  @Prop()
  description?: string;

  @Prop({ default: 0 })
  discount!: number;

  @Prop({ default: 0 })
  selled!: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);
