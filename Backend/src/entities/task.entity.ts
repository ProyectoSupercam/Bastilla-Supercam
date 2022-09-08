import {Column, Entity,  PrimaryGeneratedColumn} from "typeorm"

export enum statusTask{
    created = 0,
    inProgress = 1,
    Done = 2
}

@Entity("task")
export class Task{
    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable:true, length:64})
    title:string

    @Column({nullable:true, length:2000})
    description:string


    @Column({nullable:false, default:statusTask.created})
    status :statusTask
}   