import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const auth = async (
  req: Request,
  res: Response<any, { token: string; user: User }>,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Authoriztion header is not attached");
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("cannot read secret from environment variables");
    }
    const decoded: any = jwt.verify(token, secret);
    const user = await User.findOne({
      _id: (decoded as { _id: string; iat: number })._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    res.locals.token = token;
    res.locals.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "You are not authorized" });
  }
};
