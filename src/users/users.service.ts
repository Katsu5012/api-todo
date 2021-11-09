import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserType, userIdType } from '../types/usersService.types';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';
import { messageType, errorMessageType } from '../types/message.type';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(user: createUserType): Promise<User> {
    const createUser = await this.usersRepository.create(user);
    return createUser;
  }
  async findOne(data: userIdType): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(data);
    return user;
  }
  async deleteUser(user: User): Promise<> {
    try {
      await this.usersRepository.remove(user);
      return { message: 'success' };
    } catch (e) {
      return { errorMessage: 'failed delete user' };
    }
  }
}
