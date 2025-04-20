import { Router } from "express";
import {
  createEventController,
  getEventController,
  getEventsByCategoryController,
  getEventsByLocationController,
  getEventsByOrganizerController,
  getEventsController,
  updateEventController,
} from "../controllers/event.controller";
import { verifyToken } from "../lib/jwt";
import { verifyRole } from "../middleware/role.middleware";

const router = Router();

router.post("/", verifyToken, verifyRole(["ADMIN"]), createEventController);
router.get("/organizer/:id", verifyToken, getEventsByOrganizerController);
router.get("/category/:slug", getEventsByCategoryController);
router.get("/location/:slug", getEventsByLocationController);
router.get("/", getEventsController);
router.get("/:id", getEventController);
router.patch("/:id", verifyToken, verifyRole(["ADMIN"]), updateEventController);

export default router;
