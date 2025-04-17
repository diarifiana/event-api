import cors from "cors";
import express from "express";
import { PORT } from "./config/env";
import { errorMiddleware } from "./middlewares/error.middleware";
import eventRouter from "./routes/event.router";
import registerRouter from "./routes/register.router";
import loginRouter from "./routes/login.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
