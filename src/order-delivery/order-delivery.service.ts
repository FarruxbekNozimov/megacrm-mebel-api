import { Injectable } from '@nestjs/common';
import { CreateOrderDeliveryDto } from './dto/create-order-delivery.dto';
import { UpdateOrderDeliveryDto } from './dto/update-order-delivery.dto';
import { OrderDelivery, OrderDeliveryDocument } from './schemas/order-delivery.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class OrderDeliveryService {
  constructor(
    @InjectModel(OrderDelivery.name)
    private orderModel: Model<OrderDeliveryDocument>,
  ) {}

  async create(createOrderDeliveryDto: CreateOrderDeliveryDto) {
    const res = await new this.orderModel(createOrderDeliveryDto).save();
    return res;
  }

  async findAll() {
    return this.orderModel.find().exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateOrderDeliveryDto: UpdateOrderDeliveryDto) {
    return this.orderModel
      .findByIdAndUpdate(id, updateOrderDeliveryDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
