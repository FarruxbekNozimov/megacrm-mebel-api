import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrderDeliveryService } from './order-delivery.service';
import { CreateOrderDeliveryDto } from './dto/create-order-delivery.dto';
import { UpdateOrderDeliveryDto } from './dto/update-order-delivery.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { HttpCode } from '@nestjs/common';

@ApiTags('OrderDelivery')
@Controller('orderDelivery')
export class OrderDeliveryController {
  constructor(private readonly orderDeliveryService: OrderDeliveryService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Create orderDelivery' })
  @Post()
  create(@Body() createOrderDeliveryDto: CreateOrderDeliveryDto) {
    return this.orderDeliveryService.create(createOrderDeliveryDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Find all orderDelivery' })
  @Get()
  findAll(@Query() query: any) {
    return this.orderDeliveryService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Get one orderDelivery' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDeliveryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Update orderDelivery by id' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDeliveryDto: UpdateOrderDeliveryDto,
  ) {
    return this.orderDeliveryService.update(id, updateOrderDeliveryDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete orderDelivery by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDeliveryService.remove(id);
  }
}
