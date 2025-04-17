import cors from "cors";
import express from "express";
import { PORT } from "./config/env";
import { errorMiddleware } from "./middleware/error.middleware";
import authRouter from "./routes/auth.router";
import eventRouter from "./routes/event.router";
import profileRouter from "./routes/profile.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
