import axios, { AxiosInstance } from 'axios';
import { BaseRepository } from '@/src/domain/repository/base.repository';
import { PaginatedResult } from '@/src/domain/entity/paginated.result';

export abstract class BaseRepositoryImpl<T> implements BaseRepository<T> {
  protected readonly api: AxiosInstance;
  protected readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.api = axios.create({
      baseURL: 'http://localhost:3001', // Your NestJS Backend URL
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async search(
    query: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResult<T>> {
    const response = await this.api.get<PaginatedResult<T>>(
      `/${this.endpoint}/search`,
      {
        params: {
          q: query, // This matches the @Query('q') in your NestJS controller
          page,
          limit,
        },
      },
    );

    return response.data;
  }
  async findByPage(page: number = 1, limit: number = 10): Promise<PaginatedResult<T>> {
    const response = await this.api.get<PaginatedResult<T>>(`/${this.endpoint}/paginate`, {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  }

  async create(item: T): Promise<T> {
    const response = await this.api.post<T>(`/${this.endpoint}`, item);
    return response.data;
  }

  async findAll(): Promise<T[]> {
    const response = await this.api.get<T[]>(`/${this.endpoint}`);
    return response.data;
  }

  async findById(id: string): Promise<T | null> {
    const response = await this.api.get<T>(`/${this.endpoint}/${id}`);
    return response.data;
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    const response = await this.api.put<T>(`/${this.endpoint}/${id}`, item);
    return response.data;
  }

  async delete(id: string): Promise<boolean> {
    const response = await this.api.delete<boolean>(`/${this.endpoint}/${id}`);
    return response.data;
  }
}