import { UserEntity } from '@/src/domain/entity/user.entity';
import { UserRepository } from '@/src/domain/repository/user.repository';


export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(user: UserEntity): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }
    return this.userRepository.create(user);
  }
}


export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }
}


export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }
}


export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(
    id: string,
    data: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    const updatedUser = await this.userRepository.update(id, data);
    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found`);
    }
    return updatedUser;
  }
}


export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(id: string): Promise<boolean> {
    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new Error(`User with ID ${id} could not be deleted`);
    }
    return deleted;
  }
}

export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    return user;
  }
}
