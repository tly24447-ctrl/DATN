// src/infrastructure/data-services/data-services.module.ts
import { UserDocument, UserSchema } from '@/src/data/mongo/model/user.model';
import { CategoryRepositoryImpl } from '@/src/data/repository/category.repository.impl';
import { OrderRepositoryImpl } from '@/src/data/repository/order.repository.impl';
import { ProductRepositoryImpl } from '@/src/data/repository/product.repository.impl';
import { UserRepositoryImpl } from '@/src/data/repository/user.repository.impl';
import { VoucherRepositoryImpl } from '@/src/data/repository/voucher.repository.impl';
import { CategoryRepository } from '@/src/domain/repository/category.repository';
import { OrderRepository } from '@/src/domain/repository/order.repository';
import { ProductRepository } from '@/src/domain/repository/product.repository';
import { UserRepository } from '@/src/domain/repository/user.repository';
import { VoucherRepository } from '@/src/domain/repository/voucher.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategoryDocument,
  CategorySchema,
} from '@/src/data/mongo/model/category.model';
import { OrderDocument, OrderSchema } from '@/src/data/mongo/model/order.model';
import {
  ProductDocument,
  ProductSchema,
} from '@/src/data/mongo/model/product.model';
import {
  VoucherDocument,
  VoucherSchema,
} from '@/src/data/mongo/model/voucher.model';
import {
  WebSettingDocument,
  WebSettingSchema,
} from '../data/mongo/model/web-setting.model';
import { WebSettingRepository } from '../domain/repository/web-setting.repository';
import { WebSettingRepositoryImpl } from '../data/repository/web-setting.repository.impl';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
      { name: CategoryDocument.name, schema: CategorySchema },
      { name: OrderDocument.name, schema: OrderSchema },
      { name: ProductDocument.name, schema: ProductSchema },
      { name: VoucherDocument.name, schema: VoucherSchema },
      { name: WebSettingDocument.name, schema: WebSettingSchema },
    ]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl, // This is the "Adapter"
    },
    {
      provide: CategoryRepository,
      useClass: CategoryRepositoryImpl, // This is the "Adapter"
    },
    {
      provide: OrderRepository,
      useClass: OrderRepositoryImpl, // This is the "Adapter"
    },
    {
      provide: ProductRepository,
      useClass: ProductRepositoryImpl, // This is the "Adapter"
    },
    {
      provide: VoucherRepository,
      useClass: VoucherRepositoryImpl, // This is the "Adapter"
    },
    {
      provide: WebSettingRepository,
      useClass: WebSettingRepositoryImpl, // This is the "Adapter"
    },
  ],
  exports: [
    UserRepository,
    CategoryRepository,
    OrderRepository,
    ProductRepository,
    VoucherRepository,
    WebSettingRepository,
  ],
})
export class DataServicesModule {}
