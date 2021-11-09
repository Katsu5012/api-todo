import { ExtractJwt, Strategy as BaseJwtStrategy } from 'passport-jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../types/JWTPayload.types';
import { UsersService } from '../users/users.service';
import { User } from '../entities/User.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      // Authorization bearerからトークンを読み込む関数を返す
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 有効期間を無視するかどうか
      ignoreExpiration: false,
      // envファイルから秘密鍵を渡す
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findOne({
      user_login_id: payload.user_login_id,
    });
    if (!user) {
      throw new NotFoundException('user is not found');
    }
    return user;
  }
}
