import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CityDocument = HydratedDocument<City>;

@Schema()
export class City {
  @Prop()
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Region' }])
  region_id: mongoose.Schema.Types.ObjectId;
}

export const CitySchema = SchemaFactory.createForClass(City);
