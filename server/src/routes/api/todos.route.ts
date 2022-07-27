import { Router } from "express";
import todoController  from "../../controllers/todo.controller";
import { errorHandler } from "./../../middlewares";

const todosRouter: Router = Router();

todosRouter
  .route("/")
  // .get(errorHandler(todoController.getAllTodo.bind(todoController)))
  .get(errorHandler(todoController.getTodoBySearch.bind(todoController)))
  .post(errorHandler(todoController.createTodo.bind(todoController)));

todosRouter
  .route("/:id")
  .get(
    errorHandler(todoController.getTodo.bind(todoController)))
  .patch(errorHandler(todoController.updateTodo.bind(todoController)))
  .put(errorHandler(todoController.updateTodo.bind(todoController)))
  .delete(errorHandler(todoController.deleteTodo.bind(todoController)));

export default todosRouter;
