import { BaseRepositoryImpl } from '@/src/data/repository/base.repository.impl';
import { UserEntity } from '@/src/domain/entity/user.entity';
import { UserRepository } from '@/src/domain/repository/user.repository';


export class UserRepositoryImpl
  extends BaseRepositoryImpl<UserEntity>
  implements UserRepository {
  constructor() {
    super('users');
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const response = await this.api.get<UserEntity>(`/${this.endpoint}/email/${email}`);
    return response.data;
  }
}
