import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configService = new ConfigService(); // ポイント
    return {
      type: 'mysql',
      host: configService.get<string>('MYSQL_HOSTNAME'),
      port: Number(configService.get<string>('MYSQL_PORT')),
      username: configService.get<string>('MYSQL_USER'),
      password: configService.get<string>('MYSQL_PASSWORD'),
      database: configService.get<string>('MYSQL_DATABASE'),
      entities: [`../entities`],
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
