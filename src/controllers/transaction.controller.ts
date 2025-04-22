import { NextFunction, Request, Response } from "express";
import { createTransactionService } from "../services/transactions/create-transaction.service";
import { getTransactionsService } from "../services/transactions/get-transactions.service";
import { manageTransactionService } from "../services/transactions/manage-transaction.service";
import { getTransactionProofService } from "../services/transactions/get-transaction-proof.service";

export const createTransactionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createTransactionService(
      req.body,
      Number(res.locals.id)
    );
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

export const manageTransactionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await manageTransactionService(
      Number(req.params.id),
      req.body.action
    );
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getTransactionProofController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getTransactionProofService(req.body.id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
