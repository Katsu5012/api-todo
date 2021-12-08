import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  task_id!: number;

  @Column()
  body!: string;

  @Column({ default: false })
  is_done!: boolean;

  @Column()
  importance!: number;

  @Column()
  deadline!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
console.log('sss');
