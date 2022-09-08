import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { CreateTaskDTO } from 'src/dto/createTask.dto';
import { TaskDTO } from 'src/dto/task.dto';
import { UpdateTaskDTO } from 'src/dto/update.dto';

import { statusTask, Task } from '../entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {

    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) { }

    public async createOne(createTaskRequest: CreateTaskDTO) {

        const task = new Task();
        task.title = createTaskRequest.title
        task.description = createTaskRequest.description
        task.status = statusTask.created


        await this.taskRepository.save(task)

        const taskDTO = this.entityToDTO(task)

        return taskDTO
    }


    public async getOne(taskId: string) {
        const task: Task = await this.taskRepository.findOne(taskId)

        if (!task) {
            throw new NotFoundException(` El id ${taskId} de la tarea no existe`)
        }

        const taskDTO: TaskDTO = this.entityToDTO(task)
        return taskDTO
    }

    private entityToDTO(task: Task): TaskDTO {
        const taskdto = new TaskDTO()
        taskdto.id = task.id
        taskdto.title = task.title;
        taskdto.description = task.description;
        taskdto.status = task.status

        return taskdto
    }

    public async getAll() {
        const tasks: Task[] = await this.taskRepository.find();

        const tasksDTO: TaskDTO[] = tasks.map(x => this.entityToDTO(x))

        return tasksDTO
    }
    public async updateOne(taskId: string, updateTaskRequest: UpdateTaskDTO) {
        //buscamos la tarea por id
        const task: Task = await this.getOne(taskId)
        // seteamos la tarea para poder editarla        
        task.title = updateTaskRequest.title || task.title

        task.description = updateTaskRequest.description || task.description

        task.status = updateTaskRequest.status || task.status

        //actualizamos y guardamos la tarea
        await this.taskRepository.save(task)

        //Retornamos la tarea formato dto
        const taskDTO: TaskDTO = await this.entityToDTO(task)

        return taskDTO
    }

    public async deleteOne(taskId: string) {
        //buscamos la tarea por id
        const task: Task = await this.getOne(taskId)

        //eliminamos la tarea por
        await this.taskRepository.remove(task)

    }


}
