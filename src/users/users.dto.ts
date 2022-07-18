import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

  @ApiPropertyOptional()
  @IsString()
  readonly avatar?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  readonly password: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(100)
  firstName?: string;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(100)
  lastName?: string;

  @ApiPropertyOptional()
  @IsString()
  avatar?: string;
}
