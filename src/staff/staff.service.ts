import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff, StaffDocument } from './schemas/staff.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CheckPhoneNumber } from '../helpers/checkPhone';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff.name)
    private orderModel: Model<StaffDocument>,
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    let isLogin = await this.findOneLogin(createStaffDto.login);
    let isPhone = await this.findOnePhone(createStaffDto.phone_number);

    if (isLogin) {
      throw new BadRequestException({
        msg: 'Ushbu login avval ishlatilgan',
      });
    }
    if (isPhone) {
      throw new BadRequestException({
        msg: 'Ushbu telefon raqam avval ishlatilgan',
      });
    }
    if (
      !['SUPER-ADMIN', 'ADMIN', 'OPERATOR', 'DELIVERYMAN'].includes(
        createStaffDto.role,
      )
    ) {
      throw new BadRequestException({
        msg: `To'g'ri role kiriting : SUPER-ADMIN, ADMIN, OPERATOR, DELIVERYMAN`,
      });
    }
    try {
      CheckPhoneNumber(createStaffDto.phone_number);
    } catch (err) {
      return err;
    }

    createStaffDto.password = await bcrypt.hash(createStaffDto.password, 7);
    const res = await new this.orderModel(createStaffDto).save();
    return res;
  }

  async findAll(query: string) {
    const itemsPerPage = query['limit'] || 10;
    const allStaff = await this.orderModel.find().exec();
    const paginate = query['page'] * itemsPerPage - 1;
    const pagination = allStaff.slice(itemsPerPage, paginate);
    if (!pagination.length) {
      return allStaff;
    }
    return pagination;
  }

  async findOneLogin(login: string) {
    return this.orderModel.findOne({ login }).exec();
  }

  async findOnePhone(phone_number: string) {
    return this.orderModel.findOne({ phone_number }).exec();
  }

  async findOne(id: string) {
    return await this.orderModel.findById(id).exec();
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
