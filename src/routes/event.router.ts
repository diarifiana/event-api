import { Router } from "express";
import {
  createEventController,
  getEventController,
  getEventsController,
} from "../controllers/event.controller";

const router = Router();

router.post("/", createEventController);
router.get("/", getEventsController);
router.get("/:id", getEventController);

export default router;
