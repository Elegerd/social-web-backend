import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { SignUpDto } from 'src/auth/auth.dto';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pwd: string): Promise<Users | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(String(pwd), user.password);
    delete user.password;

    return isValid ? user : null;
  }

  async signUp(userDto: SignUpDto) {
    try {
      const hash = await bcrypt.hash(userDto.password, 10);
      await this.usersService.create({
        ...userDto,
        password: hash,
      });
      return;
    } catch {
      throw new BadRequestException('Что-то пошло не так, попробуйте еще раз');
    }
  }

  createAuthToken(user: Users): string {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async signIn(user: Users): Promise<{ access_token: string; user: Users }> {
    const token = this.createAuthToken(user);

    return { access_token: token, user };
  }
}
