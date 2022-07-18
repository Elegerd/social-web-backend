import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Patch,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Users } from 'src/users/users.entity';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto, SignInDto } from 'src/auth/auth.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UpdateUserDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiBody({ type: SignInDto })
  @ApiResponse({ type: Users, status: HttpStatus.OK })
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@User() user: Users) {
    return this.authService.signIn(user);
  }

  @ApiBody({ type: SignUpDto })
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiBearerAuth()
  @ApiResponse({ type: Users, status: HttpStatus.OK })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@User() user: Users) {
    return user;
  }

  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ type: Users, status: HttpStatus.OK })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  updateProfile(@User() user: Users, @Body() body: UpdateUserDto) {
    return this.usersService.update(user.id, body);
  }
}
