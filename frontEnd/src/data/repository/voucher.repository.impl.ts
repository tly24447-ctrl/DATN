import { BaseRepositoryImpl } from '@/src/data/repository/base.repository.impl';
import { VoucherEntity } from '@/src/domain/entity/voucher.entity';
import { VoucherRepository } from '@/src/domain/repository/voucher.repository';


export class VoucherRepositoryImpl
  extends BaseRepositoryImpl<VoucherEntity>
  implements VoucherRepository {
  constructor() {
    super('vouchers');
  }
}
