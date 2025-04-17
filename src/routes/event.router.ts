import { Router } from "express";
import {
  createEventController,
  getEventController,
  getEventsByCategoryController,
  getEventsByLocationController,
  getEventsController,
} from "../controllers/event.controller";
import { verifyToken } from "../lib/jwt";

const router = Router();

router.post("/", verifyToken, createEventController);
router.get("/", getEventsController);
router.get("/:id", getEventController);
router.get("/category/:slug", getEventsByCategoryController);
router.get("/location/:slug", getEventsByLocationController);

export default router;
