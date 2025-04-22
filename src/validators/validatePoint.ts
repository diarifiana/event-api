import { Transaction } from "@prisma/client";
import prisma from "../config/prisma";
import { ApiError } from "../utils/api-error";

export const validatePoint = async (body: Transaction) => {
  if (body.usePoints === true) {
    const point = await prisma.pointDetail.findFirst({
      where: { userId: body.userId },
    });

    if (!point || point.amount === 0) {
      throw new ApiError("Points invalid", 400);
    } else {
      return point.amount;
    }
  }
  return 0;
};
