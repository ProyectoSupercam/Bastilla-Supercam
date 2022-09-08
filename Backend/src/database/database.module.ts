import { Module } from '@nestjs/common';
import  config  from '../ormconfig';
import {  TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports:[TypeOrmModule.forRoot(config)]
})
export class DatabaseModule {}