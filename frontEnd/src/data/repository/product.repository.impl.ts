import { BaseRepositoryImpl } from '@/src/data/repository/base.repository.impl';
import { ProductEntity } from '@/src/domain/entity/product.entity';
import { ProductRepository } from '@/src/domain/repository/product.repository';


export class ProductRepositoryImpl
  extends BaseRepositoryImpl<ProductEntity>
  implements ProductRepository {
  constructor() {
    super('products');
  }
}
