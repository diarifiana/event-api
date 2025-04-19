import { Router } from "express";
import { createVoucherController } from "../controllers/voucher.controller";
import { verifyToken } from "../lib/jwt";
import { verifyRole } from "../middleware/role.middleware";

const router = Router();

router.post("/", verifyToken, verifyRole(["ADMIN"]), createVoucherController);

export default router;
