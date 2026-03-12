import { UserRepositoryImpl } from '@/src/data/repository/user.repository.impl';
import { CreateUserUseCase, DeleteUserUseCase, GetAllUsersUseCase, GetUserByEmailUseCase, GetUserUseCase, UpdateUserUseCase } from '@/src/domain/use-case/user.use-case';

const userRepository = new UserRepositoryImpl();
export const AppProviders = {
  UserRepository: userRepository,
  CreateUserUseCase: new CreateUserUseCase(userRepository),
  GetAllUsersUseCase: new GetAllUsersUseCase(userRepository),
  GetUserUseCase: new GetUserUseCase(userRepository),
  UpdateUserUseCase: new UpdateUserUseCase(userRepository),
  DeleteUserUseCase: new DeleteUserUseCase(userRepository),
  GetUserByEmailUseCase: new GetUserByEmailUseCase(userRepository),
};