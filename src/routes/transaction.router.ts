import { Router } from "express";
import {
  createTransactionController,
  getTransactionsController,
} from "../controllers/transaction.controller";

const router = Router();

router.post("/", createTransactionController);
router.get("/", getTransactionsController);

export default router;
