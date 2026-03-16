import { BaseRepositoryImpl } from '@/src/data/repository/base.repository.impl';
import { WebSettingRepository } from '@/src/domain/repository/web-setting.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
import { WebSettingDocument } from '../mongo/model/web-setting.model';

@Injectable()
export class WebSettingRepositoryImpl
  extends BaseRepositoryImpl<WebSettingDocument>
  implements WebSettingRepository
{
  constructor(
    @InjectModel(WebSettingDocument.name)
    private readonly WebSettingModel: Model<WebSettingDocument>,
  ) {
    super(WebSettingModel);
  }

  // Inside your WebSettingMongoRepository (or similar implementation class)

  getFilter(searchRegex: RegExp): QueryFilter<WebSettingDocument> {
    return { webName: searchRegex } as QueryFilter<WebSettingDocument>;
  }
}
