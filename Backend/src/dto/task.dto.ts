import { statusTask } from "src/entities/task.entity";

export class TaskDTO{
    id:string;
    title:string;
    description:string
    status:statusTask;
}