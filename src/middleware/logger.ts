import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

export const logError = (
  err: ErrorRequestHandler,
  _: Request,
  __: Response,
  next: NextFunction
) => {
  console.error(err);
  next(err);
};
