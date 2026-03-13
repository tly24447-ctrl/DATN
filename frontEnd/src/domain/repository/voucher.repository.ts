import { BaseRepository } from '@/src/domain/repository/base.repository';
import { VoucherEntity } from '@/src/domain/entity/voucher.entity';

export abstract class VoucherRepository extends BaseRepository<VoucherEntity> {}
