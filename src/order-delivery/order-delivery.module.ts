import { Module } from '@nestjs/common';
import { OrderDeliveryService } from './order-delivery.service';
import { OrderDeliveryController } from './order-delivery.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDelivery, OrderDeliverySchema } from './schemas/order-delivery.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderDelivery.name, schema: OrderDeliverySchema }]),
    JwtModule
  ],
  controllers: [OrderDeliveryController],
  providers: [OrderDeliveryService],
})
export class OrderDeliveryModule { }
