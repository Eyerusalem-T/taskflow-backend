import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { Roles, Role } from '../auth/roles.decorator';
@UseGuards(JwtAuthGuard)
@Roles(Role.ADMIN)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Post('create-with-task')
  createWithTask(@Body() dto: any) {
    return this.projectsService.createProjectWithFirstTask(dto);
  }
}
