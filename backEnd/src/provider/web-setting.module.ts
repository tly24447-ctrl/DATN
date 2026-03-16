import { Module } from '@nestjs/common';
import { DataServicesModule } from '@/src/provider/data-services.module';
import { WebSettingController } from '@/src/presentation/controllers/web-setting.controller';
import {
  CreateWebSettingUseCase,
  GetWebSettingUseCase,
  UpdateWebSettingUseCase,
} from '@/src/domain/use-case/web-setting.use-case';

@Module({
  imports: [DataServicesModule], // Provides WebSettingRepository via your infrastructure layer
  controllers: [WebSettingController],
  providers: [
    CreateWebSettingUseCase,
    GetWebSettingUseCase,
    UpdateWebSettingUseCase,
  ],
  exports: [
    CreateWebSettingUseCase,
    GetWebSettingUseCase,
    UpdateWebSettingUseCase,
  ],
})
export class WebSettingModule {}
