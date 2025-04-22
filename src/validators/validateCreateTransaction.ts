import { body, validationResult } from "express-validator";
import { ApiError } from "../utils/api-error";
import { NextFunction, Request, Response } from "express";

export const validateCreateTransaction = [
  body("ticketId").notEmpty().withMessage("ticketId is required"),
  body("qty").notEmpty().withMessage("quantity is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(errors.array()[0].msg, 400);
    }
    next();
  },
];
