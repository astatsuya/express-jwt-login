import { Request, Router } from "express";

import { routers } from "./constants";
import { User, UserField } from "../models/user";
import { auth } from "../middleware/auth";

export const router = Router();

router.get(routers.USER_PROFILE, auth, async (_, res, next) => {
  try {
    res.send(res.locals.user);
  } catch (err) {
    next(err);
  }
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
    next(err);
  }
});

router.patch(routers.USER_PROFILE, auth, async (req, res, next) => {
  try {
    const { user } = res.locals;
    const requestKeys = Object.keys(req.body);
    const allowedUpdates: (keyof Pick<UserField, "username" | "password">)[] = [
      "username",
      "password",
    ];
    const isValidRequest = requestKeys.every((key) =>
      ((allowedUpdates as any) as string[]).includes(key)
    );

    if (!isValidRequest) {
      return res.status(400).send({ error: "Invalid request" });
    }
    requestKeys.forEach((key) => {
      user[key as "username" | "password"] = req.body[key];
    });
    await user.save();
    res.send("user status was updated!");
  } catch (err) {
    next(err);
  }
});

router.post(routers.LOGIN, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials({ email, password });
    if (!user) {
      res.status(404).send("cannot found user");
    }
    const token = await user.generateAuthToken();
    res.send({ message: "success login!", token });
  } catch (err) {
    next(err);
  }
});

router.post(routers.LOGOUT, auth, async (_, res, next) => {
  try {
    const { user, token: newToken } = res.locals;
    user.tokens = user.tokens.filter((token) => token.token !== newToken);

    await user.save();
    res.send({ message: "logout" });
  } catch (err) {
    next(err);
  }
});
