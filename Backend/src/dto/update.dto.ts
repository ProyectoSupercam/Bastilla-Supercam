import { statusTask } from "src/entities/task.entity";

export class UpdateTaskDTO{
    title?:string;
    description?:string
    status?:statusTask
}