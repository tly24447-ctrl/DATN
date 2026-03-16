import { WebSettingEntity } from '@/src/domain/entity/web-setting.entity';
import { WebSettingRepository } from '@/src/domain/repository/web-setting.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientSession } from 'mongoose';

@Injectable()
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

@Injectable()
export class UpdateWebSettingUseCase {
  constructor(private readonly webSettingRepository: WebSettingRepository) {}

  /**
   * Updates the existing settings or creates them if they don't exist.
   */
  async execute(
    data: Partial<WebSettingEntity>,
    session?: ClientSession,
  ): Promise<WebSettingEntity> {
    const settings = await this.webSettingRepository.findAll();

    if (settings.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const id = (settings[0] as any)._id || (settings[0] as any).id;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const updated = await this.webSettingRepository.update(id, data, session);
      if (!updated) throw new NotFoundException('Failed to update settings');
      return updated;
    }

    // Fallback: If for some reason someone calls update before any record exists
    return this.webSettingRepository.create(data as WebSettingEntity, session);
  }
}

@Injectable()
export class CreateWebSettingUseCase {
  constructor(private readonly webSettingRepository: WebSettingRepository) {}

  async execute(setting: WebSettingEntity): Promise<WebSettingEntity> {
    // Ensure we don't create duplicates
    const existing = await this.webSettingRepository.findAll();
    if (existing.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const id = (existing[0] as any)._id || (existing[0] as any).id;
      return this.webSettingRepository.update(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        id,
        setting,
      ) as Promise<WebSettingEntity>;
    }

    return this.webSettingRepository.create(setting);
  }
}
