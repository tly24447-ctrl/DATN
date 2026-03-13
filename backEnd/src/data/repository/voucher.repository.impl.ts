import { BaseRepositoryImpl } from '@/src/data/repository/base.repository.impl';
import { VoucherRepository } from '@/src/domain/repository/voucher.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
import { VoucherDocument } from '../mongo/model/voucher.model';

@Injectable()
export class VoucherRepositoryImpl
  extends BaseRepositoryImpl<VoucherDocument>
  implements VoucherRepository
{
  constructor(
    @InjectModel(VoucherDocument.name)
    private readonly voucherModel: Model<VoucherDocument>,
  ) {
    super(voucherModel);
  }

  // Inside your VoucherMongoRepository (or similar implementation class)

  getFilter(searchRegex: RegExp): QueryFilter<VoucherDocument> {
    return {
      $or: [
        { code: { $regex: searchRegex } }, // Search by Voucher Code
      ],
    } as QueryFilter<VoucherDocument>;
  }
}
