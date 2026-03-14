import { PaginatedResult } from '@/src/domain/entity/paginated.result';
import { ClientSession } from 'mongoose';

export abstract class BaseRepository<T> {
  abstract create(item: T, session?: ClientSession): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract findByPage(
    page?: number,
    limit?: number,
  ): Promise<PaginatedResult<T>>;
  abstract search(
    query: string,
    page?: number,
    limit?: number,
  ): Promise<PaginatedResult<T>>;
  abstract findById(id: string, session?: ClientSession): Promise<T | null>;
  abstract update(
    id: string,
    item: Partial<T>,
    session?: ClientSession,
  ): Promise<T | null>;
  abstract delete(id: string, session?: ClientSession): Promise<boolean>;
}
