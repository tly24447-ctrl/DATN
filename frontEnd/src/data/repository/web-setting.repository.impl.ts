import { BaseRepositoryImpl } from '@/src/data/repository/base.repository.impl';
import { WebSettingEntity } from '@/src/domain/entity/web-setting.entity';
import { WebSettingRepository } from '@/src/domain/repository/web-setting.repository';

export class WebSettingRepositoryImpl
  extends BaseRepositoryImpl<WebSettingEntity>
  implements WebSettingRepository 
{
  constructor() {
    // Matches the @Controller('web-settings') in your NestJS backend
    super('web-settings');
  }

  /**
   * Overriding the update method because the WebSettingController 
   * @Put() route does not require an ID parameter.
   */
  override async update(id: string, item: Partial<WebSettingEntity>): Promise<WebSettingEntity | null> {
    // We ignore the 'id' parameter and call the root PUT /web-settings
    const response = await this.api.put<WebSettingEntity>(`/${this.endpoint}`, item);
    return response.data;
  }

  /**
   * Overriding findById because we usually just want the single global setting.
   * You can call this with any dummy ID or handle it specifically.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override async findById(_id: string): Promise<WebSettingEntity | null> {
    const response = await this.api.get<WebSettingEntity>(`/${this.endpoint}`);
    return response.data;
  }
}