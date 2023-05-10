import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref:'Products' }])
	product_id:mongoose.Schema.Types.ObjectId;

	@Prop()
	fullname:string;

	@Prop()
	address:string;

	@Prop()
	target:string;

	@Prop([{ type: mongoose.Schema.Types.ObjectId, ref:'OrderStatus' }])
	status_id:mongoose.Schema.Types.ObjectId;

	@Prop([{ type: mongoose.Schema.Types.ObjectId, ref:'City' }])
	city_id:mongoose.Schema.Types.ObjectId;

	@Prop()
	phone_number:string;

	@Prop()
	cause:string;

	
}

export const OrderSchema = SchemaFactory.createForClass(Order);
