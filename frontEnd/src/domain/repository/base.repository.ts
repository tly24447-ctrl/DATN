import { PaginatedResult } from '@/src/domain/entity/paginated.result';

export abstract class BaseRepository<T> {
  abstract create(item: T): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract findById(id: string): Promise<T | null>;
  abstract findByPage(
    page?: number,
    limit?: number,
  ): Promise<PaginatedResult<T>>;
  abstract search(
    query: string,
    page?: number,
    limit?: number,
  ): Promise<PaginatedResult<T>>;
  abstract update(id: string, item: Partial<T>): Promise<T | null>;
  abstract delete(id: string): Promise<boolean>;
}
