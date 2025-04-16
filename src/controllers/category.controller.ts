import { NextFunction, Request, Response } from "express";
import { getCategoriesService } from "../services/event/get-categories.service";
import { getCategoryService } from "../services/event/get-category.service";

export const getCategoriesController = async (
  _req: Request,
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

export const getCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getCategoryService(req.params.slug);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
