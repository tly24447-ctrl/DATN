import { Model, Document } from 'mongoose';
import { BaseRepository } from '@/src/domain/repository/base.repository';

export class BaseRepositoryImpl<
  T extends Document,
> implements BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(item: any): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await this.model.create(item);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
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
