import { Module } from '@nestjs/common';
import { OrderDeliveryService } from './order-delivery.service';
import { OrderDeliveryController } from './order-delivery.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDelivery, OrderDeliverySchema } from './schemas/order-delivery.schema';
import { JwtModule } from '@nestjs/jwt';
import { StaffModule } from '../staff/staff.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderDelivery.name, schema: OrderDeliverySchema }]),
    JwtModule, StaffModule
  ],
  controllers: [OrderDeliveryController],
  providers: [OrderDeliveryService],
})
export class OrderDeliveryModule { }
