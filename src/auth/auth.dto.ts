import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import {
  IsString,
  IsDefined,
  MaxLength,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

import { IsUniqueEmail } from 'src/common/validators/unique-email.validator';

export class SignInDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MaxLength(100)
  password: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;
}

export class SignUpDto extends PickType(SignInDto, ['email', 'password']) {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @ApiPropertyOptional()
  @IsString()
  avatar?: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  @IsUniqueEmail({}, { message: 'Пользователь с таким email уже существует' })
  email: string;
}
