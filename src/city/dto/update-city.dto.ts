import { ApiProperty } from '@nestjs/swagger';

export class UpdateCityDto {
  @ApiProperty({ example: 'Toshkent' })
  name: string;

  @ApiProperty({ example: 'eq93-043qw-mso' })
  region_id: string;
}
