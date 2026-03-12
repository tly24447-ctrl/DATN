// src/presentation/controllers/user.controller.ts
import { UserEntity } from '@/src/domain/entity/user.entity';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByEmailUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
} from '@/src/domain/use-case/user.use-case'; // Adjust path if they are in one file
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async create(@Body() user: UserEntity): Promise<UserEntity> {
    return await this.createUserUseCase.execute(user);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.getAllUsersUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.getUserUseCase.execute(id);
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string): Promise<UserEntity> {
    return await this.getUserByEmailUseCase.execute(email);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    return await this.updateUserUseCase.execute(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.deleteUserUseCase.execute(id);
  }
}
