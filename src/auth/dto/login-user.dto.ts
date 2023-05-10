import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: 'Toshmat1717' })
  login: string;

  @ApiProperty({ example: 'Uzbek!$t0n' })
  password: string;
}
