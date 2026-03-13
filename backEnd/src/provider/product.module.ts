// src/presentation/modules/product.module.ts

import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetAllProductsUseCase,
  GetProductsByPageUseCase,
  GetProductUseCase,
  SearchProductsUseCase,
  UpdateProductUseCase,
} from '@/src/domain/use-case/product.use-case';
import { ProductController } from '@/src/presentation/controllers/product.controller';
import { DataServicesModule } from '@/src/provider/data-services.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DataServicesModule], // Provides ProductRepository implementation
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    GetAllProductsUseCase,
    GetProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    GetProductsByPageUseCase,
    SearchProductsUseCase,
  ],
  exports: [
    CreateProductUseCase,
    GetAllProductsUseCase,
    GetProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    GetProductsByPageUseCase,
    SearchProductsUseCase,
  ],
})
export class ProductModule {}
