import { Router } from "express";
import { ROUTES } from "./constants";

export const router = Router();

router.get(ROUTES.NOT_FOUND, (_, res) => {
  res.status(404).send("Not Found");
});
