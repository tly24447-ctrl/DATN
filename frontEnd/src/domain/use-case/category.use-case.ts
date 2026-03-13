// src/domain/use-case/category/category.use-case.ts

import { CategoryEntity } from '@/src/domain/entity/category.entity';
import { PaginatedResult } from '@/src/domain/entity/paginated.result';
import { CategoryRepository } from '@/src/domain/repository/category.repository';
import { Constants } from '@/src/shared/constans';


export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(category: CategoryEntity): Promise<CategoryEntity> {
    // Categories usually have unique names
    const categories = await this.categoryRepository.findAll();
    const exists = categories.find((c) => c.name === category.name);

    if (exists) {
      throw new Error(
        `Category with name "${category.name}" already exists`,
      );
    }

    return this.categoryRepository.create(category);
  }
}


export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(): Promise<CategoryEntity[]> {
    return this.categoryRepository.findAll();
  }
}


export class GetCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    return category;
  }
}


export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(
    id: string,
    data: Partial<CategoryEntity>,
  ): Promise<CategoryEntity | null> {
    const updated = await this.categoryRepository.update(id, data);
    if (!updated) {
      throw new Error(`Category with ID ${id} not found`);
    }
    return updated;
  }
}


export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(id: string): Promise<boolean> {
    const deleted = await this.categoryRepository.delete(id);
    if (!deleted) {
      throw new Error(
        `Category with ID ${id} could not be deleted`,
      );
    }
    return deleted;
  }
}


export class GetCategoriesByPageUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(
    page: number = Constants.PAGE,
    limit: number = Constants.LIMIT,
  ): Promise<PaginatedResult<CategoryEntity>> {
    return this.categoryRepository.findByPage(page, limit);
  }
}


export class SearchCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(
    query: string,
    page: number = Constants.PAGE,
    limit: number = Constants.LIMIT,
  ): Promise<PaginatedResult<CategoryEntity>> {
    return this.categoryRepository.search(query, page, limit);
  }
}
