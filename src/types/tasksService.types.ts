import { Task } from '../entities/Task.entity';

export type crateTaskType = {
  body: Task['body'];
  importance: Task['importance'];
  deadline: Task['deadline'];
};

export type taskIdType = {
  task_id: Task['task_id'];
};

export type updateTaskType = {
  body: Task['body'];
  is_done: Task['is_done'];
  importance: Task['importance'];
  deadline: Task['deadline'];
};
