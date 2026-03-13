// src/presentation/modules/category.module.ts

import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetAllCategoriesUseCase,
  GetCategoriesByPageUseCase,
  GetCategoryUseCase,
  SearchCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@/src/domain/use-case/category.use-case';
import { CategoryController } from '@/src/presentation/controllers/category.controller';
import { DataServicesModule } from '@/src/provider/data-services.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DataServicesModule], // Provides CategoryRepository implementation
  controllers: [CategoryController],
  providers: [
    CreateCategoryUseCase,
    GetAllCategoriesUseCase,
    GetCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    GetCategoriesByPageUseCase,
    SearchCategoriesUseCase,
  ],
  exports: [
    // Exporting use cases if they need to be used in other modules (e.g., ProductModule)
    CreateCategoryUseCase,
    GetAllCategoriesUseCase,
    GetCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    GetCategoriesByPageUseCase,
    SearchCategoriesUseCase,
  ],
})
export class CategoryModule {}
