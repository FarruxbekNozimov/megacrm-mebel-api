import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City, CityDocument } from './schemas/city.schema';
import { InjectModel } from '@nestjs/mongoose';
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

  async findAll(query: string) {
    const itemsPerPage = query['limit'] || 10;
    const allStaff = await this.orderModel.find().exec();
    const paginate = query['page'] * itemsPerPage - 1;
    const pagination = allStaff.slice(paginate, paginate + itemsPerPage);
    if (!pagination.length) {
      return allStaff;
    }
    return pagination;
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
