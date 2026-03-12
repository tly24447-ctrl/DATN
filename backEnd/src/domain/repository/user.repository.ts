import { BaseRepository } from '@/src/domain/repository/base.repository';
import { UserEntity } from '@/src/domain/entity/user.entity';

export abstract class UserRepository extends BaseRepository<UserEntity> {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
}
