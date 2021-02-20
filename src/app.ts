import express from "express";
import "./db/index";
import { logErrors, errorHandler } from "./middleware/errorHandler";
import * as user from "./routers/user";
import * as notFound from "./routers/notFound";

export const app = express();
app.use(express.json());

app.use(user.router);
app.use(notFound.router);

app.use(logErrors);
app.use(errorHandler);
