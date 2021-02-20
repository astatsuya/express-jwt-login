import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

export const logErrors = (
  err: ErrorRequestHandler,
  _: Request,
  __: Response,
  next: NextFunction
) => {
  console.error(err);
  next(err);
};

export const errorHandler = (
  _: ErrorRequestHandler,
  __: Request,
  res: Response,
  ___: NextFunction
) => {
  res.status(500).send("internal server error");
};
