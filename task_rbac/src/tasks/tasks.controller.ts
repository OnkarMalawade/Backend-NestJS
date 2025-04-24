import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { BasicAuthGuard } from '../auth/basic-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { TaskStatusValidationPipe } from '../common/pipes/task-status-validation.pipe';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { PaginationDto } from '../common/dto/pagination.page';

@Controller('tasks')
@UseGuards(BasicAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body(TaskStatusValidationPipe) createTaskDto: CreateTaskDto,
    @CurrentUser() user,
  ) {
    return this.tasksService.create(createTaskDto, user.id);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tasksService.findAll(paginationDto);
  }

  @Get('mine')
  findMyTasks(@CurrentUser() user) {
    return this.tasksService.findByUserId(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user) {
    const task = await this.tasksService.findOne(+id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(TaskStatusValidationPipe) updateTaskDto: UpdateTaskDto,
    @CurrentUser() user,
  ) {
    const task = await this.tasksService.findOne(+id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Check if user owns the task or is an admin
    if (task.createdBy !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('You can only update your own tasks');
    }

    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string) {
    const task = await this.tasksService.findOne(+id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.tasksService.remove(+id);
  }
}
