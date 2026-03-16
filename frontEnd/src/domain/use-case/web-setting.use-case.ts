import { WebSettingEntity } from '@/src/domain/entity/web-setting.entity';
import { WebSettingRepository } from '@/src/domain/repository/web-setting.repository';


export class GetWebSettingUseCase {
  constructor(private readonly webSettingRepository: WebSettingRepository) {}

  /**
   * Fetches the global settings.
   * If no settings exist yet, it returns a default object.
   */
  async execute(): Promise<WebSettingEntity> {
    const settings = await this.webSettingRepository.findAll();

    if (settings.length === 0) {
      // Return a default structure if the DB is empty
      return {
        webName: 'My Bookstore',
        headerIcon: 'Library',
        isActive: true,
      } as WebSettingEntity;
    }

    return settings[0];
  }
}


export class UpdateWebSettingUseCase {
  constructor(private readonly webSettingRepository: WebSettingRepository) {}

  /**
   * Updates the existing settings or creates them if they don't exist.
   */
  async execute(
    data: Partial<WebSettingEntity>,
  ): Promise<WebSettingEntity> {

    // Fallback: If for some reason someone calls update before any record exists
    return this.webSettingRepository.create(data as WebSettingEntity);
  }
}


export class CreateWebSettingUseCase {
  constructor(private readonly webSettingRepository: WebSettingRepository) {}

  async execute(setting: WebSettingEntity): Promise<WebSettingEntity> {
    return this.webSettingRepository.create(setting);
  }
}
