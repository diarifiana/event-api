import { NextFunction, Request, Response } from "express";
import { createTransactionService } from "../services/transactions/create-transaction.service";

export const createTransactionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createTransactionService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
