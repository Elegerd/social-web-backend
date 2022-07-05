import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';

import { Users } from 'src/users/users.entity';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto, SignInDto } from 'src/auth/auth.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: SignInDto })
  @Post('sign-in')
  async signIn(@User() user: Users) {
    return this.authService.signIn(user);
  }

  @ApiBody({ type: SignUpDto })
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@User() user: Users) {
    return user;
  }
}
