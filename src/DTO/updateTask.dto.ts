import { Length, IsString, IsInt, Min, Max, IsBoolean } from 'class-validator';
import { Task } from '../entities/Task.entity';

export class updateTaskDto {
  @IsString()
  @Length(1, 200)
  body: Task['body'];
  @IsBoolean()
  is_done: Task['is_done'];
  @IsInt()
  @Min(1)
  @Max(3)
  importance: Task['importance'];
  @IsString()
  @Length(10, 10)
  deadline: Task['deadline'];
}
