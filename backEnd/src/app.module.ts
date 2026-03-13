import { CategoryModule } from '@/src/provider/category.module';
import { OrderModule } from '@/src/provider/order.module';
import { ProductModule } from '@/src/provider/product.module';
import { UserModule } from '@/src/provider/user.module';
import { VoucherModule } from '@/src/provider/voucher.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/datn'),
    UserModule,
    CategoryModule,
    VoucherModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
