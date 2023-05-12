import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const res = await new this.orderModel(createOrderDto).save();
    return res;
  }

  async findAll(query: string) {
    const itemsPerPage = query['limit'] || 10;
    const allStaff = await this.orderModel.find().exec();
    const paginate = query['page'] * itemsPerPage - 1;
    const pagination = allStaff.slice(paginate, paginate + itemsPerPage);
    if (!pagination.length) {
      return allStaff;
    }
    return pagination;
    return this.orderModel.find().exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
