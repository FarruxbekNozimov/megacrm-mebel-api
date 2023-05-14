import { ApiProperty } from '@nestjs/swagger';

export class CreateProductsDto {
  @ApiProperty({ example: 'Kreslo' })
  name: string;

  @ApiProperty({ example: 'https://example.com/img.png' })
  img: string;

  @ApiProperty({ example: '12000$' })
  price: string;

  @ApiProperty({ example: '213s-edqwel123asr' })
  category_id: string;

  @ApiProperty({ example: '213s-edqwel123asr' })
  staff_id: string;

  @ApiProperty({ example: "Kreslo o'tirish uchun" })
  description: string;
}
