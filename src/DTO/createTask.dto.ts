import { Length, IsString, IsInt, Min, Max } from 'class-validator';
import { Task } from '../entities/Task.entity';

export class createTaskDto {
  @IsString()
  @Length(1, 200)
  body: Task['body'];
  @IsInt()
  @Min(1)
  @Max(3)
  importance: Task['importance'];
  @IsString()
  @Length(10, 10)
  deadline: Task['deadline'];
}
