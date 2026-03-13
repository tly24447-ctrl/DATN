import { BaseRepository } from '@/src/domain/repository/base.repository';
import { ProductEntity } from '@/src/domain/entity/product.entity';

export abstract class ProductRepository extends BaseRepository<ProductEntity> {}
