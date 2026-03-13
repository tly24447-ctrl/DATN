// src/presentation/modules/voucher.module.ts

import {
  CreateVoucherUseCase,
  DeleteVoucherUseCase,
  GetAllVouchersUseCase,
  GetVouchersByPageUseCase,
  GetVoucherUseCase,
  SearchVouchersUseCase,
  UpdateVoucherUseCase,
} from '@/src/domain/use-case/voucher.use-case';
import { VoucherController } from '@/src/presentation/controllers/voucher.controller';
import { DataServicesModule } from '@/src/provider/data-services.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DataServicesModule], // Provides VoucherRepository implementation
  controllers: [VoucherController],
  providers: [
    CreateVoucherUseCase,
    GetAllVouchersUseCase,
    GetVoucherUseCase,
    UpdateVoucherUseCase,
    DeleteVoucherUseCase,
    GetVouchersByPageUseCase,
    SearchVouchersUseCase,
  ],
  exports: [
    CreateVoucherUseCase,
    GetAllVouchersUseCase,
    GetVoucherUseCase,
    UpdateVoucherUseCase,
    DeleteVoucherUseCase,
    GetVouchersByPageUseCase,
    SearchVouchersUseCase,
  ],
})
export class VoucherModule {}
