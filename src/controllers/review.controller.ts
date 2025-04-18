import { NextFunction, Request, Response } from "express";
import { createReviewService } from "../services/reviews/create-review.service";
import { getReviewsOrganizerService } from "../services/reviews/get-reviews-by-organizer.service";

export const createReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createReviewService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getReviewsByOrganizerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getReviewsOrganizerService(Number(req.params.id));
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
