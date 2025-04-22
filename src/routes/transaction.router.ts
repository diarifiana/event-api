import { Router } from "express";
import {
  createTransactionController,
  getTransactionsController,
  manageTransactionsController,
} from "../controllers/transaction.controller";
import { verifyToken } from "../lib/jwt";
import { verifyRole } from "../middleware/role.middleware";
import { validateCreateTransaction } from "../validators/validateCreateTransaction";

const router = Router();

router.post(
  "/",
  verifyToken,
  verifyRole(["USER"]),
  validateCreateTransaction,
  createTransactionController
);
router.get("/", getTransactionsController);
router.patch(
  "/manage/:id",
  verifyToken,
  verifyRole(["ADMIN"]),
  manageTransactionsController
);

export default router;
