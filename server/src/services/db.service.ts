import { FilterQuery, ObjectId, Types } from "mongoose";
import { ITodoItem, ITodoItemDocument, IUserDocument, TodoItem, User } from "./../models";

export class DBService {
  async findAllTodoItems(params: ITodoItem) {
    return TodoItem.find(params);
  }
  async findOneUser(
    email: string,
    password?: string
  ): Promise<IUserDocument | null> {
    const query: { email: string; password?: string } = { email };
    if (password) {
      query.password = password;
    }
    return User.findOne(query);
  }
  async createUser(params: { email: string; password: string }) {
    await User.create(params);
  }
  async createTodo(params: ITodoItem) {
    return TodoItem.create(params);
  }
  async findById(params: ITodoItem) {
    return TodoItem.findOne(params);
  }
  async findByIdAndUpdate(id: string, params: ITodoItem) {
    return TodoItem.findByIdAndUpdate(id, params, {new: true});
  }

  async deleteTodo(id: string) {
    return TodoItem.findByIdAndDelete(id);
  }

  async findBySearchTodos(params: 
    {page: number; pageSize: number; isPublic?: boolean; status?: string; req?: any; 
      search?: string }, 
    user_id: Types.ObjectId){
    const skipCount = params.page ==1? 0: params.pageSize*(params.page-1);
    const query: FilterQuery<ITodoItemDocument> 
    //= {user_id: ObjectId, isPublic?: boolean, isComplited?: boolean, 
    //   search?: { $regex: RegExp, $options: string }} 
    = {user_id};
    if (params.search != null){query.title= { $regex: new RegExp(params.search), $options: 'i' }};
    if(params.isPublic !=null){query.isPublic =params.isPublic}
    if(params.status !=null){ query.isComplited = params.status == 'complited';}
    console.log( query, params.search, skipCount, params.pageSize); 
    const count = await TodoItem.count(query);
    const data = await TodoItem.find(query).sort({_id:-1}).skip(skipCount).limit(params.pageSize).exec()
    return {data, metaData: {count}}
  }
}

