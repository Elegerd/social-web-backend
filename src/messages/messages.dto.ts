import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateMessagesDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  text: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  conversationId: number;
}
