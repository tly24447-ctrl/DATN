import { CategoryDocument } from '@/src/data/mongo/model/category.model';
import { BaseRepositoryImpl } from '@/src/data/repository/base.repository.impl';
import { CategoryRepository } from '@/src/domain/repository/category.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';

@Injectable()
export class CategoryRepositoryImpl
  extends BaseRepositoryImpl<CategoryDocument>
  implements CategoryRepository
{
  constructor(
    @InjectModel(CategoryDocument.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {
    super(categoryModel);
  }

  getFilter(searchRegex: RegExp): QueryFilter<CategoryDocument> {
    return {
      $or: [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ],
    } as QueryFilter<CategoryDocument>;
  }
}
