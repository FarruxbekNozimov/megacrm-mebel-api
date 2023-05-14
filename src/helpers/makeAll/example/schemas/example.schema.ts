import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ExampleDocument = HydratedDocument<Example>;

@Schema({ timestamps: true })
export class Example {
  'props';
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
