import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from '../DTO/createUser.dto';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entities/User.entity';
import { errorMessage } from '../types/message.type';
import { zeroPaddingDate } from '../functions/usersController.functions';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUsers(
    @Body(new ValidationPipe()) user: createUserDto,
  ): Promise<User | errorMessage> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      const userLoginId = uuidv4().replace('-', '').slice(0, 8);
      const createUser = await this.usersService.create({
        user_login_id: userLoginId,
        user_name: user.user_name,
        password: hashedPassword,
      });
      return createUser;
    } catch (e) {
      return { errorMessage: 'failed register user' };
    }
  }
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Req() request: { user: User }) {
    const afterSixDays: Date = new Date();
    afterSixDays.setDate(afterSixDays.getDate() + 6);
    const date = new Date(afterSixDays);
    let count = 1;
    while (count <= 7) {
      const serchDayStringChange = zeroPaddingDate(date);
      count++;
      date.setDate(date.getDate() - 1);
    }
  }

  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  async deleteMe(@Req() request: { user: User }) {}
}
