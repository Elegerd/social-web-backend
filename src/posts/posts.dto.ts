import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined, MaxLength } from 'class-validator';

export class PostDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MaxLength(254)
  text: string;
}
