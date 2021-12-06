import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/Task.entity';
import { Repository, UpdateResult } from 'typeorm';
import {
  crateTaskType,
  taskIdType,
  updateTaskType,
} from '../types/tasksService.types';
import { errorMessageType, messageType } from 'src/types/message.type';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(createTask: crateTaskType): Promise<Task> {
    const task = await this.tasksRepository.save(createTask);
    return this.findOne({ task_id: task.task_id });
  }

  async findOne(taskID: taskIdType): Promise<Task> {
    const task = await this.tasksRepository.findOne(taskID);
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  async findAll(): Promise<Task[]> {
    const tasks: Task[] = await this.tasksRepository.find();
    console.log(tasks);
    return tasks;
  }

  async updateTask(
    id: Task['task_id'],
    updateTask: updateTaskType,
  ): Promise<messageType | errorMessageType> {
    try {
      const task = await this.tasksRepository.update(id, updateTask);
      return { message: 'task updated successfully' };
    } catch (e) {
      return { errorMessage: 'failed task updated' };
    }
  }

  async deleteTask(task: Task): Promise<messageType | errorMessageType> {
    try {
      await this.tasksRepository.remove(task);
      return { message: 'Task deleted successfully' };
    } catch (e) {
      return { errorMessage: 'delete task failed' };
    }
  }
}
