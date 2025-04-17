import { Router } from "express";
import { createVoucherController } from "../controllers/voucher.controller";

const router = Router();

router.post("/", createVoucherController);

export default router;
