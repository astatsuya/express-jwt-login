import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { User } from "@prisma/client";
import { prisma } from "../db/prisma";

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
    const id = Number((decoded as { id: string; iat: number }).id);

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error();
    }

    const isMatchToken = user?.tokens.find((_token) => _token === token);
    if (!isMatchToken) {
      throw new Error();
    }

    res.locals.token = token;
    res.locals.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "You are not authorized" });
  }
};
