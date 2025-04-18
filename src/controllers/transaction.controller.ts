import { NextFunction, Request, Response } from "express";
import { createTransactionService } from "../services/transactions/create-transaction.service";
import { getTransactionsService } from "../services/transactions/get-transactions.service";

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

export const getTransactionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getTransactionsService();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
