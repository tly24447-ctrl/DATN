// src/domain/use-case/product/product.use-case.ts

import { ProductEntity } from '@/src/domain/entity/product.entity';
import { ProductRepository } from '@/src/domain/repository/product.repository';
import { PaginatedResult } from '@/src/domain/entity/paginated.result';
import { Constants } from '@/src/shared/constans';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientSession } from 'mongoose';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(product: ProductEntity): Promise<ProductEntity> {
    // Check if a product with the same name already exists
    const products = await this.productRepository.findAll();
    const exists = products.find((p) => p.name === product.name);

    if (exists) {
      throw new ConflictException(
        `Product with name "${product.name}" already exists`,
      );
    }

    return this.productRepository.create(product);
  }
}

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductEntity[]> {
    return this.productRepository.findAll();
  }
}

@Injectable()
export class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string, session?: ClientSession): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id, session);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    id: string,
    data: Partial<ProductEntity>,
    session?: ClientSession,
  ): Promise<ProductEntity | null> {
    const updated = await this.productRepository.update(id, data, session);
    if (!updated) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updated;
  }
}

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.productRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Product with ID ${id} could not be deleted`);
    }
    return deleted;
  }
}

@Injectable()
export class GetProductsByPageUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    page: number = Constants.PAGE,
    limit: number = Constants.LIMIT,
  ): Promise<PaginatedResult<ProductEntity>> {
    return this.productRepository.findByPage(page, limit);
  }
}

@Injectable()
export class SearchProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    query: string,
    page: number = Constants.PAGE,
    limit: number = Constants.LIMIT,
  ): Promise<PaginatedResult<ProductEntity>> {
    return this.productRepository.search(query, page, limit);
  }
}
