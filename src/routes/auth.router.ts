import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller";
import { validateLogin } from "../validators/authValidator";

const router = Router();

router.post("/register", registerController);
router.post("/login", validateLogin, loginController);

export default router;
