import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { WebSettingEntity } from '@/src/domain/entity/web-setting.entity';

@Schema({ timestamps: true })
export class WebSettingDocument
  extends Document
  implements Omit<WebSettingEntity, 'id' | '_id'>
{
  @Prop({ required: true, default: 'My Bookstore' })
  webName!: string;

  @Prop({ type: String })
  logoUrl?: string;

  @Prop({ type: String, default: 'Library' })
  headerIcon?: string; // Matches Lucide name string

  @Prop({ type: String })
  contactEmail?: string;

  @Prop({ type: String })
  footerText?: string;

  @Prop({ default: true })
  isActive!: boolean;
}

export const WebSettingSchema =
  SchemaFactory.createForClass(WebSettingDocument);
