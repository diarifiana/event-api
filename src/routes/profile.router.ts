import { Router } from "express";
import {
  ChangePasswordController,
  deleteProfileController,
  updateProfileController,
} from "../controllers/profile.controller";
import { verifyToken } from "../lib/jwt";

const router = Router();

router.patch("/change-password", verifyToken, ChangePasswordController);
router.patch("/update-profile", verifyToken, updateProfileController);
router.delete("/delete-profile", verifyToken, deleteProfileController);

export default router;
