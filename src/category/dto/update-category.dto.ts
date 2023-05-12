import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Qattiq' })
  name: string;
}
