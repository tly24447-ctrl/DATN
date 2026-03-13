import { Model, Document, QueryFilter } from 'mongoose';
import { BaseRepository } from '@/src/domain/repository/base.repository';
import { PaginatedResult } from '@/src/domain/entity/paginated.result';
import { Constants } from '@/src/shared/constans';

export abstract class BaseRepositoryImpl<
  T extends Document,
> implements BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  abstract getFilter(searchRegex: RegExp): QueryFilter<T>;

  async search(
    query: string,
    page: number = Constants.PAGE,
    limit: number = Constants.LIMIT,
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const searchRegex = new RegExp(query, 'i');

    const filter = this.getFilter(searchRegex);

    const [data, total] = await Promise.all([
      this.model.find(filter).skip(skip).limit(limit).exec(),
      this.model.countDocuments(filter).exec(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(item: any): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await this.model.create(item);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }

  async findByPage(
    page: number = Constants.PAGE,
    limit: number = Constants.LIMIT,
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;

    // Run both queries in parallel for better performance
    const [data, total] = await Promise.all([
      this.model.find().skip(skip).limit(limit).exec(),
      this.model.countDocuments().exec(),
    ]);

    return {
      data: data as T[], // Ensure casting to your generic type
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}
