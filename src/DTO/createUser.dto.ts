import { Length, IsString, IsEmail } from 'class-validator';
import { User } from '../entities/User.entity';
export class createUserDto {
  @IsString()
  @Length(1, 20)
  user_name!: User['user_name'];

  @IsString()
  @Length(8, 16)
  password!: User['password'];
}
