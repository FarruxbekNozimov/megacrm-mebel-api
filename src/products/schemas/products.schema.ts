import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductsDocument = HydratedDocument<Products>;

@Schema({ timestamps: true })
export class Products {
  @Prop()
  name: string;

  @Prop()
  img: string;

  @Prop()
  price: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }])
  category_id: mongoose.Schema.Types.ObjectId;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }])
  staff_id: mongoose.Schema.Types.ObjectId;

  @Prop()
  description: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
