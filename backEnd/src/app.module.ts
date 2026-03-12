import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@/src/provider/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/datn'),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
