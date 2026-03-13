import { BaseRepositoryImpl } from '@/src/data/repository/base.repository.impl';
import { ProductRepository } from '@/src/domain/repository/product.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
import { ProductDocument } from '../mongo/model/product.model';

@Injectable()
export class ProductRepositoryImpl
  extends BaseRepositoryImpl<ProductDocument>
  implements ProductRepository
{
  constructor(
    @InjectModel(ProductDocument.name)
    private readonly productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }

  // Inside your ProductMongoRepository (or similar implementation class)

  getFilter(searchRegex: RegExp): QueryFilter<ProductDocument> {
    return {
      $or: [
        { name: { $regex: searchRegex } }, // Search by Product Name/Title
        { author: { $regex: searchRegex } }, // Search by Author
        { publisher: { $regex: searchRegex } }, // Search by Publisher
        { isbn: { $regex: searchRegex } }, // Search by ISBN Number
        { description: { $regex: searchRegex } }, // Search within the description
        { language: { $regex: searchRegex } }, // Search by Language
      ],
    } as QueryFilter<ProductDocument>;
  }
}
