import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import { createTaskDto } from '../DTO/createTask.dto';

import { Task } from '../entities/Task.entity';
import { errorMessageType, messageType } from 'src/types/message.type';
import { updateTaskDto } from '../DTO/updateTask.dto';
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(
    @Body(new ValidationPipe()) task: createTaskDto,
  ): Promise<Task> {
    const createTask = await this.tasksService.create({
      body: task.body,
      importance: task.importance,
      deadline: task.deadline,
    });
    return createTask;
  }
  @Get()
  async allTask() {
    return await this.tasksService.findAll();
  }

  @Get(':task_id')
  async getTask(@Param('task_id') task_id: Task['task_id']): Promise<Task> {
    const task = await this.tasksService.findOne({ task_id: task_id });
    return task;
  }

  @Put(':task_id')
  async updateTask(
    @Body(new ValidationPipe()) updateTask: updateTaskDto,
    @Param('task_id') task_id: Task['task_id'],
  ): Promise<messageType | errorMessageType> {
    const task = await this.tasksService.updateTask(task_id, {
      body: updateTask.body,
      is_done: updateTask.is_done,
      importance: updateTask.importance,
      deadline: updateTask.deadline,
    });
    return task;
  }

  @Delete(':task_id')
  async deleteTask(@Param('task_id') task_id: Task['task_id']) {
    const task = await this.tasksService.findOne({ task_id: task_id });

    const removeTask = await this.tasksService.deleteTask(task);
    return removeTask;
  }
}
