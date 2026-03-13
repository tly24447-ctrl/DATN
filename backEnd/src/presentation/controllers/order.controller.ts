// src/presentation/controllers/order.controller.ts

import { OrderEntity } from '@/src/domain/entity/order.entity';
import { PaginatedResult } from '@/src/domain/entity/paginated.result';
import {
  CreateOrderUseCase,
  DeleteOrderUseCase,
  GetAllOrdersUseCase,
  GetOrdersByPageUseCase,
  GetOrderUseCase,
  SearchOrdersUseCase,
  UpdateOrderUseCase,
} from '@/src/domain/use-case/order.use-case';
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

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
    private readonly getOrdersByPageUseCase: GetOrdersByPageUseCase,
    private readonly searchOrdersUseCase: SearchOrdersUseCase,
  ) {}

  @Post()
  async create(@Body() order: OrderEntity): Promise<OrderEntity> {
    return await this.createOrderUseCase.execute(order);
  }

  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return await this.getAllOrdersUseCase.execute();
  }

  @Get('paginate')
  async findByPage(
    @Query('page') page: string = Constants.PAGE.toString(),
    @Query('limit') limit: string = Constants.LIMIT.toString(),
  ): Promise<PaginatedResult<OrderEntity>> {
    return await this.getOrdersByPageUseCase.execute(
      Number(page),
      Number(limit),
    );
  }

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('page') page: string = Constants.PAGE.toString(),
    @Query('limit') limit: string = Constants.LIMIT.toString(),
  ): Promise<PaginatedResult<OrderEntity>> {
    return await this.searchOrdersUseCase.execute(
      query,
      Number(page),
      Number(limit),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderEntity> {
    return await this.getOrderUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<OrderEntity>,
  ): Promise<OrderEntity | null> {
    return await this.updateOrderUseCase.execute(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.deleteOrderUseCase.execute(id);
  }
}
