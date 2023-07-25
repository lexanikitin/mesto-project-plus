import express from "express";
import mongoose from "mongoose";
import router from "./routes/index";
import authMiddleware from "./middleware/auth";
import errorMiddleware from "./middleware/error";
import { createUser, login } from "./controllers/auth";

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.use(authMiddleware);
app.post("/signin", login);
app.post("/signup", createUser);
app.use(router);
app.use(errorMiddleware);

app.listen(+PORT, () => console.log(`Server listening on port ${PORT}`));
