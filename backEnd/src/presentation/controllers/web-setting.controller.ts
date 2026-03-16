import { WebSettingEntity } from '@/src/domain/entity/web-setting.entity';
import {
  CreateWebSettingUseCase,
  GetWebSettingUseCase,
  UpdateWebSettingUseCase,
} from '@/src/domain/use-case/web-setting.use-case';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';

@Controller('web-settings')
export class WebSettingController {
  constructor(
    private readonly createWebSettingUseCase: CreateWebSettingUseCase,
    private readonly getWebSettingUseCase: GetWebSettingUseCase,
    private readonly updateWebSettingUseCase: UpdateWebSettingUseCase,
  ) {}

  /**
   * Get the global website settings.
   * Logic handles returning defaults if none exist.
   */
  @Get()
  async getSettings(): Promise<WebSettingEntity[]> {
    return [await this.getWebSettingUseCase.execute()];
  }

  /**
   * Initialize or overwrite web settings.
   * Internal logic ensures only one record exists.
   */
  @Post()
  async create(@Body() setting: WebSettingEntity): Promise<WebSettingEntity> {
    return await this.createWebSettingUseCase.execute(setting);
  }

  /**
   * Update the global website settings.
   * Since there's only one, we don't need an :id param.
   */
  @Put()
  async update(
    @Body() data: Partial<WebSettingEntity>,
  ): Promise<WebSettingEntity> {
    return await this.updateWebSettingUseCase.execute(data);
  }
}
