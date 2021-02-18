import { Router } from "express";
import { routers } from "./constants";

export const router = Router();

router.get(routers.USER, (_, res, next) => {
  try {
    res.send("user page");
  } catch (err) {
    next();
  }
});
