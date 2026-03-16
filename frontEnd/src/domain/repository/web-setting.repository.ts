import { BaseRepository } from '@/src/domain/repository/base.repository';
import { WebSettingEntity } from '../entity/web-setting.entity';

export abstract class WebSettingRepository extends BaseRepository<WebSettingEntity> {}
