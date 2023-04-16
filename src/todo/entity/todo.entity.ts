
import { TodoStatusEnum } from "../enum/todo-status.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId:number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ type: 'enum', enum: TodoStatusEnum,default:"En attente" })
  status:TodoStatusEnum;

}
