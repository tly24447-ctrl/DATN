import { BaseRepository } from '@/src/domain/repository/base.repository';
import { CategoryEntity } from '@/src/domain/entity/category.entity';

export abstract class CategoryRepository extends BaseRepository<CategoryEntity> {}
