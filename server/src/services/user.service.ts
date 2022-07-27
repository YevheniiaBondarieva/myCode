import { IUser } from "./../models";
import { generateToken } from "./../middlewares";
import { DBService } from "./db.service";
const dbService = new DBService();

export class UserService {
  async findOne(email: string, password: string): Promise<IUser | null> {
    const user = await dbService.findOneUser(email, password);
    return user;
  }
  async register(email: string, password: string) {
    const user = await dbService.findOneUser(email);
    if (user) {
      const err = new Error("User with this email already exists");
      throw err;
    }
    await dbService.createUser({ email, password });
  }
  async login(
    email: string,
    password: string
  ): Promise<IUser & { token: string }> {
    const user = await dbService.findOneUser(email);
    if (!user) {
      const err = new Error("User does not exist");
      throw err;
    }
    if (password !== user.password) {
      const err = new Error("Password does not correct");
      throw err;
    }
    const token = generateToken(email);
    const result = {...user.toObject(), token};
    return result;
  }
}
