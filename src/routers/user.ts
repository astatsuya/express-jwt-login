import { Request, Router } from "express";
import { routers } from "./constants";
import { User } from "../models/user";

export const router = Router();

router.get(routers.USER, (_, res, next) => {
  try {
    res.send("user page");
  } catch (err) {
    next();
  }
});

router.post(routers.USER, async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.send("created a user");
  } catch (err) {
    next();
  }
});
