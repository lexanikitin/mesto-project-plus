import express from "express";
import mongoose from "mongoose";
import { errors } from "celebrate";
import router from "./routes/index";
import authMiddleware from "./middleware/auth";
import errorMiddleware from "./middleware/error";
import { signinHandler, signupHandler } from "./controllers/auth";
import requestLogMiddleware from "./middleware/logger/request";
import errorLogMiddleware from "./middleware/logger/error";
import {signinValidationMiddleware, signupValidationMiddleware} from "./middleware/validation/auth";

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.use(requestLogMiddleware);

app.post("/signin", signinValidationMiddleware, signinHandler);
app.post("/signup", signupValidationMiddleware, signupHandler);

app.use(authMiddleware);
app.use(router);

app.use(errorLogMiddleware);

app.use(errors());
app.use(errorMiddleware);

app.listen(+PORT, () => console.log(`Server listening on port ${PORT}`));
