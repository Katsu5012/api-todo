import { User } from '../entities/User.entity';

export type createUserType = {
  user_login_id: User['user_login_id'];
  user_name: User['user_name'];
  password: User['password'];
};

export type userIdType = {
  user_login_id: User['user_login_id'];
};
