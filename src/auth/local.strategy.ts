import { Strategy as BaseLocalStrategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../entities/User.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(BaseLocalStrategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'user_login_id',
    });
  }

  async validate(
    user_login_id: User['user_login_id'],
    password: User['password'],
  ): Promise<User> {
    console.log('1');
    const user = await this.authService.validateUser(user_login_id, password);
    if (!user) {
      throw new UnauthorizedException('incorrect'); // 認証失敗
    }

    return user;
  }
}
