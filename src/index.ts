import cors from "cors";
import express from "express";
import { PORT } from "./config/env";
import categoryRouter from "./routes/category.router";
import voucherRouter from "./routes/voucher.router";
import transactionRouter from "./routes/transaction.router";
import reviewRouter from "./routes/review.router";

import authRouter from "./routes/auth.router";
import eventRouter from "./routes/event.router";
import profileRouter from "./routes/profile.router";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/events", eventRouter);
app.use("/categories", categoryRouter);
app.use("/vouchers", voucherRouter);
app.use("/transactions", transactionRouter);
app.use("/reviews", reviewRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
