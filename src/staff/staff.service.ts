import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff, StaffDocument } from './schemas/staff.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff.name)
    private orderModel: Model<StaffDocument>,
  ) { }

  async create(createStaffDto: CreateStaffDto) {
    const res = await new this.orderModel(createStaffDto).save();
    return res;
  }

  async findAll() {
    return this.orderModel.find().exec();
  }

  async findOneLogin(login: string) {
    return this.orderModel.findOne({ login }).exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    return this.orderModel
      .findByIdAndUpdate(id, updateStaffDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
