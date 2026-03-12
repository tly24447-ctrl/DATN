// src/infrastructure/repository/base.repository.impl.ts
import axios, { AxiosInstance } from 'axios';
import { BaseRepository } from '@/src/domain/repository/base.repository';

export class BaseRepositoryImpl<T> implements BaseRepository<T> {
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