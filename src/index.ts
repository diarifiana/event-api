import cors from "cors";
import express from "express";
import { PORT } from "./config/env";
import { errorMiddleware } from "./middlewares/error.middleware";
import eventRouter from "./routes/event.router";
import categoryRouter from "./routes/category.router";
import transactionRouter from "./routes/transaction.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventRouter);
app.use("/categories", categoryRouter);
app.use("/transactions", transactionRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
