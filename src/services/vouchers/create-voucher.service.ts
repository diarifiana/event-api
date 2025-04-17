import { Voucher } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const createVoucherService = async (body: Voucher) => {
  const startDate = new Date(body.startDate);
  const endDate = new Date(body.endDate);

  if (endDate <= startDate || body.discountAmount <= 0 || body.qty <= 0) {
    throw new ApiError("Data invalid", 400);
  }

  return await prisma.voucher.create({
    data: body,
  });
};
