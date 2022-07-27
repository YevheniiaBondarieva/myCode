import { ITodoItem } from "./../models";
import { DBService } from "./db.service";
const dbService = new DBService();

export class TodoService {

  private async checkUser(email: string){
    const user = await dbService.findOneUser(email);
    if (!user) {
      throw new Error("User was not found");
    }
    return user
  };

  async findAll(params: { data: ITodoItem }, email: string) {
    const user = await this.checkUser(email);
    const todoItems = await dbService.findAllTodoItems({
      ...params.data,
      user_id: user._id,
    });
    return todoItems;
  }
  async createToDo(params: { data: ITodoItem },  email: string) {
    const user = await this.checkUser(email);
    const item = await dbService.createTodo({
      ...params.data,
      user_id: user._id,
    });
    return item;
  }
  async findById(params: { data: ITodoItem },  email: string) {
    const user = await this.checkUser(email);
    const item = await dbService.findById({
      ...params.data,
      user_id: user._id,
    });
    return item;
  }

  async findByIdAndUpdate(params: {
    id: string;
    data: ITodoItem;
  }, email: string) {
    const user = await this.checkUser(email);
    const item = await dbService.findByIdAndUpdate(params.id, {
      ...params.data,
      user_id: user._id,
    });
    return item;
  }

  async deleteTodo(params: {id: string}, email: string) {
    const user = await this.checkUser(email);
    const item = await dbService.deleteTodo(params.id);
    return {user_id: user.id, item};
  }

  async findBySearch(params: {
    status?: string;
    isPublic?: boolean;
    search?: string,
    pageSize: number;
    page: number;
  } ,email: string) {
    const user = await this.checkUser(email);
    const result = await dbService.findBySearchTodos(params,user._id);
    return {user_id: user._id, ...result}
}
}

