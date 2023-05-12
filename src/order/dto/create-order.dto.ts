import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: '12039-wnrl1-qnw' })
  product_id: string;

  @ApiProperty({ example: 'Eshmatov Toshmat' })
  fullname: string;

  @ApiProperty({ example: 'Shirin St.' })
  address: string;

  @ApiProperty({ example: 'Evos oldida' })
  target: string;

  @ApiProperty({ example: '1' })
  status_id: number;

  @ApiProperty({ example: '1' })
  city_id: string;

  @ApiProperty({ example: '898030493' })
  phone_number: string;
}
