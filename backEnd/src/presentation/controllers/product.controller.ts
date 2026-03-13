// src/presentation/controllers/product.controller.ts

import { PaginatedResult } from '@/src/domain/entity/paginated.result';
import { ProductEntity } from '@/src/domain/entity/product.entity';
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetAllProductsUseCase,
  GetProductsByPageUseCase,
  GetProductUseCase,
  SearchProductsUseCase,
  UpdateProductUseCase,
} from '@/src/domain/use-case/product.use-case';
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

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly getProductsByPageUseCase: GetProductsByPageUseCase,
    private readonly searchProductsUseCase: SearchProductsUseCase,
  ) {}

  @Post()
  async create(@Body() product: ProductEntity): Promise<ProductEntity> {
    return await this.createProductUseCase.execute(product);
  }

  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return await this.getAllProductsUseCase.execute();
  }

  @Get('paginate')
  async findByPage(
    @Query('page') page: string = Constants.PAGE.toString(),
    @Query('limit') limit: string = Constants.LIMIT.toString(),
  ): Promise<PaginatedResult<ProductEntity>> {
    return await this.getProductsByPageUseCase.execute(
      Number(page),
      Number(limit),
    );
  }

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('page') page: string = Constants.PAGE.toString(),
    @Query('limit') limit: string = Constants.LIMIT.toString(),
  ): Promise<PaginatedResult<ProductEntity>> {
    return await this.searchProductsUseCase.execute(
      query,
      Number(page),
      Number(limit),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductEntity> {
    return await this.getProductUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<ProductEntity>,
  ): Promise<ProductEntity | null> {
    return await this.updateProductUseCase.execute(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.deleteProductUseCase.execute(id);
  }
}
