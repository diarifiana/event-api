import { Router } from "express";
import {
  createTransactionController,
  getTransactionsController,
} from "../controllers/transaction.controller";
import { verifyToken } from "../lib/jwt";
import { verifyRole } from "../middleware/role.middleware";

const router = Router();

router.post(
  "/",
  verifyToken,
  verifyRole(["USER"]),
  createTransactionController
);
router.get("/", getTransactionsController);

export default router;
