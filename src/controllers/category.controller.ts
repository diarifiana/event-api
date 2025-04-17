import { NextFunction, Request, Response } from "express";
import { getCategoriesService } from "../services/categories/get-categories.service";
import { getEventsByCategoryService } from "../services/events/get-events-by-category.service";

export const getCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getCategoriesService();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
