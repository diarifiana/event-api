import { Router } from "express";
import { registerController } from "../controllers/auth.controller";

const router = Router();

router.post("/", registerController);

export default router;
