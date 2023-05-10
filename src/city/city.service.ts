import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City, CityDocument } from './schemas/city.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name)
    private orderModel: Model<CityDocument>,
  ) {}

  async create(createCityDto: CreateCityDto) {
    const res = await new this.orderModel(createCityDto).save();
    return res;
  }

  async findAll() {
    return this.orderModel.find().exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateCityDto: UpdateCityDto) {
    return this.orderModel
      .findByIdAndUpdate(id, updateCityDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
