import { Request, Router } from "express";

import { routers } from "./constants";
import { User } from "../models/user";
import { auth } from "../middleware/auth";

export const router = Router();

router.get(`${routers.USER}/profile`, auth, async (_, res, next) => {
  res.send(res.locals.user);
});

router.post(routers.USER, async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    const token = await user.generateAuthToken();
    res.send({ message: "created a user", token });
  } catch (err) {
    // duplicate email
    if (err?.code === 11000) {
      res.status(400).send({ "Bad Request": err.message });
    }
    // invalid field
    if (err?.errors?.email || err?.errors?.password) {
      res.status(400).send({ "Bad Request": err.message });
    }
    next();
  }
});

router.post(routers.LOGIN, async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findByCredentials({ email, password });
  if (!user) {
    res.status(404).send("cannot found user");
  }
  const token = await user.generateAuthToken();
  res.send({ message: "success login!", token });
});
