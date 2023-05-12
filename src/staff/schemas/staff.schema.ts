import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type StaffDocument = HydratedDocument<Staff>;

@Schema()
export class Staff {
  @Prop()
  fullname: string;

  @Prop()
  phone_number: string;

  @Prop()
  card: string;

  @Prop()
  login: string;

  @Prop()
  password: string;

  @Prop()
  is_active: boolean;

  @Prop()
  role: string;

  @Prop()
  hashed_token: string;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
