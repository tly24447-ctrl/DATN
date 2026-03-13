import { BaseRepositoryImpl } from '@/src/data/repository/base.repository.impl';
import { CategoryEntity } from '@/src/domain/entity/category.entity';
import { CategoryRepository } from '@/src/domain/repository/category.repository';


export class CategoryRepositoryImpl
  extends BaseRepositoryImpl<CategoryEntity>
  implements CategoryRepository {
  constructor() {
    super('categories');
  }
}
