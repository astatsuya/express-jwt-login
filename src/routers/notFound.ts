import { Router } from "express";
import { routers } from "./constants";

export const router = Router();

router.get(routers.NOT_FOUND, (_, res) => {
  res.status(404).send("Not Found");
});
