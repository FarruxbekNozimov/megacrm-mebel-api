import { Injectable } from '@nestjs/common';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { Products, ProductsDocument } from './schemas/products.schema';
import { InjectModel } from "@nestjs/mongoose";
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

  async findAll() {
    return this.orderModel.find().exec();
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
