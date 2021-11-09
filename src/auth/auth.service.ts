import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/User.entity';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from '../types/JWTPayload.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    user_login_id: User['user_login_id'],
    password: User['password'],
  ): Promise<User | null> {
    const user = await this.usersService.findOne({
      user_login_id: user_login_id,
    });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async getAccessToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      user_id: user.user_id,
      user_login_id: user.user_login_id,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: '7d',
    });
  }
}
