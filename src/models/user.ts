import { model, Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

export type User = {
  username: string;
  email: string;
  password: string;
  tokens: { token: string }[];
  generateAuthToken: () => Promise<string>;
} & Document;

export type UserStatics = {
  findByCredentials: (params: {
    email: string;
    password: string;
  }) => Promise<User>;
} & Model<User>;

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
      validate(value: any) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is invalid");
        }
      },
    },
    tokens: [{ token: { type: String, required: true } }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function (): Promise<string> {
  const user = this;
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("cannot read secret from environment variables");
  }
  const token = jwt.sign({ _id: String(user.id) }, secret);
  user.tokens = [...user.tokens, { token }];
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (params: {
  email: string;
  password: string;
}) => {
  try {
    const { email, password } = params;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error();
    }

    return user;
  } catch (err) {
    return null;
  }
};

// hash password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

export const User = model<User, UserStatics>("User", userSchema);
