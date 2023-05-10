import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region, RegionDocument } from './schemas/region.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name)
    private orderModel: Model<RegionDocument>,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    const res = await new this.orderModel(createRegionDto).save();
    return res;
  }

  async findAll() {
    return this.orderModel.find().exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    return this.orderModel
      .findByIdAndUpdate(id, updateRegionDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
