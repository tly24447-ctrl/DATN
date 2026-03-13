// src/presentation/controllers/user.controller.ts
import { PaginatedResult } from '@/src/domain/entity/paginated.result';
import { UserEntity } from '@/src/domain/entity/user.entity';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByEmailUseCase,
  GetUsersByPageUseCase,
  GetUserUseCase,
  SearchUsersUseCase,
  UpdateUserUseCase,
} from '@/src/domain/use-case/user.use-case'; // Adjust path if they are in one file
import { Constants } from '@/src/shared/constans';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
    private readonly getUsersByPageUseCase: GetUsersByPageUseCase,
    private readonly searchUsersUseCase: SearchUsersUseCase,
  ) {}

  @Post()
  async create(@Body() user: UserEntity): Promise<UserEntity> {
    return await this.createUserUseCase.execute(user);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.getAllUsersUseCase.execute();
  }

  @Get('paginate')
  async findByPage(
    @Query('page') page: string = Constants.PAGE.toString(),
    @Query('limit') limit: string = Constants.LIMIT.toString(),
  ): Promise<PaginatedResult<UserEntity>> {
    // Queries come in as strings from the URL, so we convert them to numbers
    return await this.getUsersByPageUseCase.execute(
      Number(page),
      Number(limit),
    );
  }

  @Get('search')
  async search(
    @Query('q') query: string, // The search term
    @Query('page') page: string = Constants.PAGE.toString(),
    @Query('limit') limit: string = Constants.LIMIT.toString(),
  ): Promise<PaginatedResult<UserEntity>> {
    return await this.searchUsersUseCase.execute(
      query,
      Number(page),
      Number(limit),
    );
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
