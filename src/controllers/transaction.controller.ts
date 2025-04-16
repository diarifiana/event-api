import { NextFunction, Request, Response } from "express";
import createTransactionService from "../services/transaction/create-transaction.service";
import { ApiError } from "../utils/api-error";

export async function createTransactionController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const result = await createTransactionService(request.body);
    response.status(200).send(result);
  } catch (error) {
    next(error);
  }
}
