import { NextFunction, Request, Response } from "express";
import { createVoucherService } from "../services/vouchers/create-voucher.service";

export const createVoucherController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createVoucherService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
