import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserDocument extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: false })
  isAdmin!: boolean;

  @Prop()
  phone?: number;

  @Prop()
  address?: string;

  @Prop()
  avatar?: string;

  @Prop()
  city?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
