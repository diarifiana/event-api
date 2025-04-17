import cors from "cors";
import express from "express";
import { PORT } from "./config/env";
import registerRouter from "./routes/register.router";
import loginRouter from "./routes/login.router";
import eventRouter from "./routes/event.router";
import categoryRouter from "./routes/category.router";
import voucherRouter from "./routes/voucher.router";
import transactionRouter from "./routes/transaction.router";

import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/events", eventRouter);
app.use("/categories", categoryRouter);
app.use("/vouchers", voucherRouter);
app.use("/transactions", transactionRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
