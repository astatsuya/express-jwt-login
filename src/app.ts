import express from "express";
import path from "path";
import { logErrors, errorHandler } from "./middleware/errorHandler";
import * as user from "./routers/user";
import * as notFound from "./routers/notFound";

export const app = express();
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../public")));
app.use("/login", express.static(path.join(__dirname, "../public/login.html")));
app.use("/user", express.static(path.join(__dirname, "../public/user.html")));

app.use(user.router);
app.use(notFound.router);

app.use(logErrors);
app.use(errorHandler);
