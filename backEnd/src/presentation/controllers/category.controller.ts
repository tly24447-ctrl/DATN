// src/presentation/controllers/category.controller.ts

import { PaginatedResult } from '@/src/domain/entity/paginated.result';
import { CategoryEntity } from '@/src/domain/entity/category.entity';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetAllCategoriesUseCase,
  GetCategoriesByPageUseCase,
  GetCategoryUseCase,
  SearchCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@/src/domain/use-case/category.use-case';
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

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly getCategoryUseCase: GetCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly getCategoriesByPageUseCase: GetCategoriesByPageUseCase,
    private readonly searchCategoriesUseCase: SearchCategoriesUseCase,
  ) {}

  @Post()
  async create(@Body() category: CategoryEntity): Promise<CategoryEntity> {
    return await this.createCategoryUseCase.execute(category);
  }

  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return await this.getAllCategoriesUseCase.execute();
  }

  @Get('paginate')
  async findByPage(
    @Query('page') page: string = Constants.PAGE.toString(),
    @Query('limit') limit: string = Constants.LIMIT.toString(),
  ): Promise<PaginatedResult<CategoryEntity>> {
    return await this.getCategoriesByPageUseCase.execute(
      Number(page),
      Number(limit),
    );
  }

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('page') page: string = Constants.PAGE.toString(),
    @Query('limit') limit: string = Constants.LIMIT.toString(),
  ): Promise<PaginatedResult<CategoryEntity>> {
    return await this.searchCategoriesUseCase.execute(
      query,
      Number(page),
      Number(limit),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryEntity> {
    return await this.getCategoryUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<CategoryEntity>,
  ): Promise<CategoryEntity | null> {
    return await this.updateCategoryUseCase.execute(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.deleteCategoryUseCase.execute(id);
  }
}
