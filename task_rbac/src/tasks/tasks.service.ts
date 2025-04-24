import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { PaginationDto } from '../common/dto/pagination.page';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  create(createTaskDto: CreateTaskDto, userId: number): Task {
    const task = new Task();
    task.id = this.nextId++;
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = createTaskDto.status || TaskStatus.OPEN;
    task.createdBy = userId;
    task.createdAt = new Date();
    task.updatedAt = new Date();

    this.tasks.push(task);
    return task;
  }

  findAll(paginationDto: PaginationDto): Task[] {
    let filteredTasks = [...this.tasks];

    // Apply search if provided
    if (paginationDto.search) {
      const search = paginationDto.search.toLowerCase();
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search),
      );
    }

    // Apply pagination - using default values from the DTO
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return filteredTasks.slice(startIndex, endIndex);
  }

  findByUserId(userId: number): Task[] {
    return this.tasks.filter((task) => task.createdBy === userId);
  }

  findOne(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task | undefined {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex >= 0) {
      const updatedTask = {
        ...this.tasks[taskIndex],
        ...updateTaskDto,
        updatedAt: new Date(),
      };

      this.tasks[taskIndex] = updatedTask;
      return updatedTask;
    }

    return undefined;
  }

  remove(id: number): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
    }
  }
}
