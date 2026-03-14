// src/domain/use-case/voucher/voucher.use-case.ts

import { VoucherEntity } from '@/src/domain/entity/voucher.entity';
import { VoucherRepository } from '@/src/domain/repository/voucher.repository';
import { PaginatedResult } from '@/src/domain/entity/paginated.result';
import { Constants } from '@/src/shared/constans';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientSession } from 'mongoose';

@Injectable()
export class CreateVoucherUseCase {
  constructor(private readonly voucherRepository: VoucherRepository) {}

  async execute(voucher: VoucherEntity): Promise<VoucherEntity> {
    // Vouchers must have unique codes
    const vouchers = await this.voucherRepository.findAll();
    const exists = vouchers.find((v) => v.code === voucher.code);

    if (exists) {
      throw new ConflictException(
        `Voucher with code "${voucher.code}" already exists`,
      );
    }

    return this.voucherRepository.create(voucher);
  }
}

@Injectable()
export class GetAllVouchersUseCase {
  constructor(private readonly voucherRepository: VoucherRepository) {}

  async execute(): Promise<VoucherEntity[]> {
    return this.voucherRepository.findAll();
  }
}

@Injectable()
export class GetVoucherUseCase {
  constructor(private readonly voucherRepository: VoucherRepository) {}

  async execute(id: string, session?: ClientSession): Promise<VoucherEntity> {
    const voucher = await this.voucherRepository.findById(id, session);
    if (!voucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }
    return voucher;
  }
}

@Injectable()
export class UpdateVoucherUseCase {
  constructor(private readonly voucherRepository: VoucherRepository) {}

  async execute(
    id: string,
    data: Partial<VoucherEntity>,
    session?: ClientSession,
  ): Promise<VoucherEntity | null> {
    const updated = await this.voucherRepository.update(id, data, session);
    if (!updated) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }
    return updated;
  }
}

@Injectable()
export class DeleteVoucherUseCase {
  constructor(private readonly voucherRepository: VoucherRepository) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.voucherRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Voucher with ID ${id} could not be deleted`);
    }
    return deleted;
  }
}

@Injectable()
export class GetVouchersByPageUseCase {
  constructor(private readonly voucherRepository: VoucherRepository) {}

  async execute(
    page: number = Constants.PAGE,
    limit: number = Constants.LIMIT,
  ): Promise<PaginatedResult<VoucherEntity>> {
    return this.voucherRepository.findByPage(page, limit);
  }
}

@Injectable()
export class SearchVouchersUseCase {
  constructor(private readonly voucherRepository: VoucherRepository) {}

  async execute(
    query: string,
    page: number = Constants.PAGE,
    limit: number = Constants.LIMIT,
  ): Promise<PaginatedResult<VoucherEntity>> {
    return this.voucherRepository.search(query, page, limit);
  }
}
