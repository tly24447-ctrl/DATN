// src/data/repository/mongo/user-mongo.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '@/src/data/mongo/model/user.model';
import { BaseRepositoryImpl } from '@/src/data/repository/base.repository.impl';
import { UserRepository } from '@/src/domain/repository/user.repository';

@Injectable()
export class UserRepositoryImpl
  extends BaseRepositoryImpl<UserDocument>
  implements UserRepository
{
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  // You can still add User-specific methods here
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
