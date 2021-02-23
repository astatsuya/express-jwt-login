import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

export const hash = async (req: Request, _: Response, next: NextFunction) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 8);
  }
  next();
};
