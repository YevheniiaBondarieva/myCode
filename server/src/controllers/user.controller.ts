import { Response, Request } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}
  async getOneUser(req: Request, res: Response) {
    const { email, password } = req.query;
    if (email == undefined) {
      return res.status(400).send({ message: "Parameter email is required" });
    } else if (password == undefined) {
      return res
        .status(400)
        .send({ message: "Parameter password is required" });
    }
    const user = await this.userService.findOne(
      email.toString(),
      password.toString()
    );
    res.send(user);
  }
  async register( req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (email == undefined) {
        return res.status(400).send({ message: "Email is required" });
      }
      if (password == undefined) {
        return res.status(400).send({ message: "Password is required" });
      }
      await this.userService.register(email, password);

      return res.status(201).send({ message: "User was created" });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({ message: err.toString() });
      }
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (email == undefined) {
        return res.status(400).send({ message: "Email is required" });
      }
      if (password == undefined) {
        return res.status(400).send({ message: "Password is required" });
      }
      const user = await this.userService.login(email, password);
      return res.status(200).send(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({ message: err.toString() });
      }
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
}




export const userController = new UserController(new UserService());


