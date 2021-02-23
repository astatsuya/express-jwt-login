import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma";

export const generateAuthToken = async (user: User) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("cannot read secret from environment variables");
  }
  const token = jwt.sign({ id: user.id }, secret, {
    expiresIn: 5 * 60, // 5 minutes,
  });
  await prisma.user.update({ where: { id: user.id }, data: { tokens: token } });

  return token;
};
