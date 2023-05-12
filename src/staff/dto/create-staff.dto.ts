import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({ example: 'Alibek' })
  fullname: string;

  @ApiProperty({ example: '70' })
  @MaxLength(10)
  phone_number: string;

  @ApiProperty({ example: '8600 1092 0923 1294' })
  card: string;

  @ApiProperty({ example: '123login' })
  login: string;

  @ApiProperty({ example: '123password' })
  password: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  role: string;
}
