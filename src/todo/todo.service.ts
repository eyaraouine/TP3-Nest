import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { TodoEntity } from "./entity/todo.entity";
import {Repository} from "typeorm"
import { AddTodoDTO } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
      ) {}
      async create(newTodo:AddTodoDTO, userId: number): Promise<TodoEntity> {
        const todo = new TodoEntity();
        todo.name = newTodo.name;
        todo.description = newTodo.description;
        todo.userId = userId; 
        return this.todoRepository.save(todo);
      }
      async update(id:number,todo:UpdateTodoDto, userId:number): Promise<TodoEntity>{
        const todoToUpdate = await this.todoRepository.findOne({where:{id}});
        if (todoToUpdate && todoToUpdate.userId === userId) {
            todoToUpdate.name=todo.name?todo.name:todoToUpdate.name;
            todoToUpdate.description = todo.description?todo.description:todoToUpdate.description;
            todoToUpdate.status = todo.status?todo.status:todoToUpdate.status;
            return this.todoRepository.save(todoToUpdate);
          } else {
            throw new UnauthorizedException('Accès non autorisé');
          }
      }
      async delete(id:number,userId:number): Promise<void>{
        const todo = await this.todoRepository.findOne({where:{id}});
        if (todo && todo.userId === userId) {
           await this.todoRepository.delete(id);
        } else {
          throw new UnauthorizedException('Accès non autorisé');
        }
      }

      }
    