import { Router } from "express";
import {
  getCategoriesController,
  getCategoryController,
} from "../controllers/category.controller";

const router = Router();

router.get("/", getCategoriesController);
router.get("/:slug", getCategoryController);

export default router;
