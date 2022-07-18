import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined } from 'class-validator';

export class PostDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  text: string;
}
