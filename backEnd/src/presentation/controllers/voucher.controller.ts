// src/presentation/controllers/voucher.controller.ts

import { PaginatedResult } from '@/src/domain/entity/paginated.result';
import { VoucherEntity } from '@/src/domain/entity/voucher.entity';
import {
  CreateVoucherUseCase,
  DeleteVoucherUseCase,
  GetAllVouchersUseCase,
  GetVouchersByPageUseCase,
  GetVoucherUseCase,
  SearchVouchersUseCase,
  UpdateVoucherUseCase,
} from '@/src/domain/use-case/voucher.use-case';
import { Constants } from '@/src/shared/constans';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('vouchers')
export class VoucherController {
  constructor(
    private readonly createVoucherUseCase: CreateVoucherUseCase,
    private readonly getAllVouchersUseCase: GetAllVouchersUseCase,
    private readonly getVoucherUseCase: GetVoucherUseCase,
    private readonly updateVoucherUseCase: UpdateVoucherUseCase,
    private readonly deleteVoucherUseCase: DeleteVoucherUseCase,
    private readonly getVouchersByPageUseCase: GetVouchersByPageUseCase,
    private readonly searchVouchersUseCase: SearchVouchersUseCase,
  ) {}

  @Post()
  async create(@Body() voucher: VoucherEntity): Promise<VoucherEntity> {
    return await this.createVoucherUseCase.execute(voucher);
  }

  @Get()
  async findAll(): Promise<VoucherEntity[]> {
    return await this.getAllVouchersUseCase.execute();
  }

  @Get('paginate')
  async findByPage(
    @Query('page') page: string = Constants.PAGE.toString(),
    @Query('limit') limit: string = Constants.LIMIT.toString(),
  ): Promise<PaginatedResult<VoucherEntity>> {
    return await this.getVouchersByPageUseCase.execute(
      Number(page),
      Number(limit),
    );
  }

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('page') page: string = Constants.PAGE.toString(),
    @Query('limit') limit: string = Constants.LIMIT.toString(),
  ): Promise<PaginatedResult<VoucherEntity>> {
    return await this.searchVouchersUseCase.execute(
      query,
      Number(page),
      Number(limit),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VoucherEntity> {
    return await this.getVoucherUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<VoucherEntity>,
  ): Promise<VoucherEntity | null> {
    return await this.updateVoucherUseCase.execute(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.deleteVoucherUseCase.execute(id);
  }
}
