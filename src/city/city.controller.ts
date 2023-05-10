import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto'
import { UpdateCityDto } from './dto/update-city.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { HttpCode } from '@nestjs/common';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Create city' })
  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Find all city' })
  @Get()
  findAll() {
    return this.cityService.findAll();
  }


  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Get one city' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Update city by id' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(id, updateCityDto);
  }


  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete city by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityService.remove(id);
  }
}
