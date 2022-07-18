import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class CreateConversationsDto {
  @ApiProperty()
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  participantIds: number[];
}
