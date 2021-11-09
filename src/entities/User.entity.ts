import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Task } from './Task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({ default: null })
  user_name!: string;

  @Column({ unique: true })
  user_login_id!: string;

  @Column()
  @Exclude()
  password!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Task, (tasks: Task) => tasks.user)
  tasks: Task[];
}
