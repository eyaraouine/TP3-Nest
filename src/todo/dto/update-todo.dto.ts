import { TodoStatusEnum } from "../enum/todo-status.enum";

export class UpdateTodoDto {
        name:string;  
        description:string;
        status:TodoStatusEnum;
      

}