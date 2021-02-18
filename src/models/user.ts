import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

export type User = {
  username: string;
  email: string;
  password: string;
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
      validate(value: any) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 20,
      validate(value: any) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is invalid");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

// hash password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

export const User = model<User>("User", userSchema);
