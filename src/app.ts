import express from "express";
import mongoose from "mongoose";
import router from "./routes/index";
import authMiddleware from "./middleware/auth";
import errorMiddleware from "./middleware/error";
import { signinHandler, signupHandler } from "./controllers/auth";

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.post("/signin", signinHandler);
app.post("/signup", signupHandler);

app.use(authMiddleware);
app.use(router);
app.use(errorMiddleware);

app.listen(+PORT, () => console.log(`Server listening on port ${PORT}`));
