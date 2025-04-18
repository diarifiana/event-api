import { Review } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const createReviewService = async (body: Review) => {
  const transaction = await prisma.transaction.findFirst({
    where: { id: body.transactionId },
  });

  if (!transaction || transaction.status !== "DONE") {
    throw new ApiError("Cannot submit review", 400);
  }

  const newData = await prisma.review.create({
    data: body,
  });

  return { message: "Created successfully", newData };
};
