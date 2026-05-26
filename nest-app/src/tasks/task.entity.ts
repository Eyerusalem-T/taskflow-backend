import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Project } from '../projects/project.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ default: false })
  completed!: boolean;

  @ManyToOne(() => Project, (p) => p.tasks)
  project!: Project;
}
