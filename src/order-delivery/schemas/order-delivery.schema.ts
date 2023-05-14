import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDeliveryDocument = HydratedDocument<OrderDelivery>;

@Schema({ timestamps: true })
export class OrderDelivery {
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }])
  staff_id: mongoose.Schema.Types.ObjectId;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }])
  order_id: mongoose.Schema.Types.ObjectId;

  @Prop()
  description: string;
}

export const OrderDeliverySchema = SchemaFactory.createForClass(OrderDelivery);
