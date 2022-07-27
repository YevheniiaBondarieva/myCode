import { ObjectId } from "mongodb";
import { Document, Model, model, Schema } from "mongoose";
// TODO: Use it as an example
/**
 * Interface to model the User Schema for TypeScript.
 * @param title:string
 * @param description:string
 * @param year: string
 * @param isPublic: boolean
 * @param isComplited: boolean
 *
 */
export interface ITodoItem {
  user_id: ObjectId;
  title: string;
  description: string;
  year: string;
  isPublic: boolean;
  isComplited: boolean;
}

export interface ITodoItemDocument extends Document, ITodoItem {}

const todoItemSchema: Schema = new Schema({
  user_id: { type: ObjectId, required: true },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: String, default: () => new Date().getFullYear()
  },
  isPublic: { type: Boolean, default: false },
  isComplited: { type: Boolean, default: false },
});

export const TodoItem = model<ITodoItemDocument>(
  "TodoItem",
  todoItemSchema
);
