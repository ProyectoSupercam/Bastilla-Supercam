import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateTaskDTO } from 'src/dto/createTask.dto';
import { UpdateTaskDTO } from 'src/dto/update.dto';
import {TaskService} from '../task/task.service'

@Controller('tasks')
export class TaskController {
    constructor(private readonly tasksService: TaskService){}

    @Get()
    public async getAll(){
        
        const resp = await this.tasksService.getAll();
        
        return resp
    }

    @Get("/:id")

    public async getOne(@Param("id") taskId:string){

        const resp = await this.tasksService.getOne(taskId);

        return resp
    }

    @Post()
    public async createOne(@Body() createTaskRequest:CreateTaskDTO){
        
        const resp = await this.tasksService.createOne(createTaskRequest)
        
        
        return resp
    }

    @Put("/:id")

        public async updateOne(@Param("id") taskId:string, @Body() updateTaskRequest:UpdateTaskDTO){
            const resp = await this.tasksService.updateOne(taskId, updateTaskRequest)

    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)

    public async deleteOne(@Param("id") taskId:string){
         await  this.tasksService.deleteOne(taskId) 
    }
    
}


