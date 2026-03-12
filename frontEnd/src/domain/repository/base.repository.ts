// src/domain/repository/base.repository.ts
export abstract class BaseRepository<T> {
  abstract create(item: T): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract findById(id: string): Promise<T | null>;
  abstract update(id: string, item: Partial<T>): Promise<T | null>;
  abstract delete(id: string): Promise<boolean>;
}
