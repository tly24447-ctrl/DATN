import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByEmailUseCase,
  GetUsersByPageUseCase,
  GetUserUseCase,
  SearchUsersUseCase,
  UpdateUserUseCase,
} from '@/src/domain/use-case/user.use-case';
import { UserController } from '@/src/presentation/controllers/user.controller';
import { DataServicesModule } from '@/src/provider/data-services.module';
import { Module } from '@nestjs/common';
@Module({
  imports: [DataServicesModule], // Module that provides the UserRepository
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserUseCase,
    GetUserByEmailUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUsersByPageUseCase,
    SearchUsersUseCase,
  ],
})
export class UserModule {}
