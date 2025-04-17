import { Router } from "express";
import { loginController } from "../controllers/auth.controller";
import { validateLogin } from "../validators/authValidator";

const router = Router();

router.post("/", validateLogin, loginController);

export default router;
