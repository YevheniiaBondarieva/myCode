import { Application } from "express";
import { authMiddleware } from "./../middlewares";
import todosRouter from "./api/todos.route";
import userRouter from "./api/user.route";
class AppRouter {
  constructor(private app: Application) {}
  init() {
    this.app.get("/", (_req, res) => {
      res.send("API Running");
    });
    this.app.use(
      "/api/todos",
      authMiddleware({ ignoredRoutes: [] }),
      todosRouter
    );
    this.app.use(
      "/api/user",
      authMiddleware({
        ignoredRoutes: ["/login", "/register"],
      }),
      userRouter
    );
  }
}

export default AppRouter;
