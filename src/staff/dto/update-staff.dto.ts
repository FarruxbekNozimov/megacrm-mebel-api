import { ApiProperty } from '@nestjs/swagger';

export class UpdateStaffDto {
  @ApiProperty({ example: 'Gulchapchap' })
  fullname?: string;

  @ApiProperty({ example: '+998121231212' })
  phone_number?: string;

  @ApiProperty({ example: '8600 1092 0923 1294' })
  card?: string;

  @ApiProperty({ example: '123login' })
  login?: string;

  @ApiProperty({ example: '123password' })
  password?: string;

  @ApiProperty({ example: '1' })
  role?: string;

  hashed_token?: string;
}
