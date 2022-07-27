import { Request } from "express";
import { any } from "joi";
import { TodoService } from "../services/todo.service";

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: Request) {
    const email: string | undefined = Array.isArray(req.headers["email"])
      ? req.headers["email"][0]
      : req.headers["email"];
    if (!email) {
      throw new Error("User was not found");
    }
    const todos = await this.todoService.findAll({ data: req.body }, email);
    return todos;
  }

  async getTodo(req: Request) {
    const email: string | undefined = Array.isArray(req.headers["email"])
      ? req.headers["email"][0]
      : req.headers["email"];
    if (!email) {
      throw new Error("User was not found");
    }
    const todo = await this.todoService.findById({ data: req.body }, email);
    return todo;
  }

  async createTodo(req: Request) {
    const email: string | undefined = Array.isArray(req.headers["email"])
      ? req.headers["email"][0]
      : req.headers["email"];
    if (!email) {
      throw new Error("User was not found");
    }
    const newTodo = await this.todoService.createToDo(
      {
        data: req.body,
      },
      email
    );
    return newTodo;
  }

  async updateTodo(req: Request) {
    const email: string | undefined = Array.isArray(req.headers["email"])
      ? req.headers["email"][0]
      : req.headers["email"];
    if (!email) {
      throw new Error("User was not found");
    }
    const { id } = req.params;
    const todo = await this.todoService.findByIdAndUpdate(
      {
        id,
        data: req.body,
      },
      email
    );
    return todo;
  }

  async deleteTodo(req: Request) {
    const email: string | undefined = Array.isArray(req.headers["email"])
      ? req.headers["email"][0]
      : req.headers["email"];
    if (!email) {
      throw new Error("User was not found");
    }
    const { id } = req.params;
    const todo = await this.todoService.deleteTodo({ id }, email);
    return todo;
  }

  async getTodoBySearch(req: Request) {
    const email: string | undefined = Array.isArray(req.headers["email"])
      ? req.headers["email"][0]
      : req.headers["email"];
    if (!email) {
      throw new Error("User was not found");
    }
    let params: {
      isPublic?: boolean;
      status?: string;
      search?: string; 
      pageSize: number; 
      page: number} ={page: 1, pageSize: 10};
    if (req.query.isPublic != null){params.isPublic= req.query.isPublic == 'true'};
    if (req.query.status != null){params.status= req.query.status as string};
    if (req.query.search != null){params.search= req.query.search  as string};
    if (req.query.pageSize)
      //!= null && !Array.isArray(req.query.pageSize))
    {params.pageSize = parseInt(req.query.pageSize as string , 10)};
    if (req.query.page != null && !Array.isArray(req.query.page))
    {params.page = parseInt(req.query.page as string , 10)};
    const searchResult = await this.todoService.findBySearch(params, email);
    return searchResult;
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
