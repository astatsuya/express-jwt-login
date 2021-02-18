import { model, Schema, Document, SchemaDefinition } from "mongoose";

export type User = {
  username: string;
  email: string;
} & Document;

const userSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<User>("User", userSchema);
