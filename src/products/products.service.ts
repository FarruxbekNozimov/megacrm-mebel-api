import { Injectable } from '@nestjs/common';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { Products, ProductsDocument } from './schemas/products.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private orderModel: Model<ProductsDocument>,
  ) {}

  async create(createProductsDto: CreateProductsDto) {
    const res = await new this.orderModel(createProductsDto).save();
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

  async update(id: string, updateProductsDto: UpdateProductsDto) {
    return this.orderModel
      .findByIdAndUpdate(id, updateProductsDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
