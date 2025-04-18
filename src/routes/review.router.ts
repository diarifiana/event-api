import { Router } from "express";
import {
  createReviewController,
  getReviewsByOrganizerController,
} from "../controllers/review.controller";

const router = Router();

router.post("/", createReviewController);
router.get("/:id", getReviewsByOrganizerController);

export default router;
