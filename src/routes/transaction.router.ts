import { Router } from "express";
import { createTransactionController } from "../controllers/transaction.controller";

const router = Router();

router.post("/", createTransactionController);

export default router;
