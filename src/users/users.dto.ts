import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsEmail } from 'class-validator';

export class UsersDto {
  readonly id?: number;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  readonly password: string;
}
