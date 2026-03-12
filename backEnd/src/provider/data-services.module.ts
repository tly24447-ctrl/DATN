// src/infrastructure/data-services/data-services.module.ts
import { UserSchema, UserDocument } from '@/src/data/mongo/model/user.model';
import { UserRepositoryImpl } from '@/src/data/repository/user.repository.impl';
import { UserRepository } from '@/src/domain/repository/user.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl, // This is the "Adapter"
    },
  ],
  exports: [UserRepository],
})
export class DataServicesModule {}
