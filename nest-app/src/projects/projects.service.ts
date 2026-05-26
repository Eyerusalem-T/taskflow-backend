import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Project } from './project.entity';
import { Task } from '../tasks/task.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,

    @InjectRepository(Task)
    private taskRepo: Repository<Task>,

    private dataSource: DataSource,
  ) {}

  async findAll(user: any) {
    if (user.role === 'admin') {
      return this.projectRepo.find({
        relations: {
          tasks: true,
        },
      });
    }

    return this.projectRepo.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: {
        tasks: true,
      },
    });
  }

  findOne(id: number) {
    return this.projectRepo.findOne({
      where: { id },
      relations: {
        tasks: true,
      },
    });
  }

  // 🔥 transaction requirement
  async createProjectWithFirstTask(data: {
    projectName: string;
    taskTitle: string;
  }) {
    return this.dataSource.transaction(async (manager) => {
      const project = manager.create(Project, {
        name: data.projectName,
      });

      const savedProject = await manager.save(project);

      const task = manager.create(Task, {
        title: data.taskTitle,
        project: savedProject,
      });

      await manager.save(task);

      return {
        project: savedProject,
        task,
      };
    });
  }
}
