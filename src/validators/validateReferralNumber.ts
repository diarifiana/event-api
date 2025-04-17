// utils/validateReferralNumber.ts
import prisma from "../config/prisma";
import { ApiError } from "../utils/api-error";

export const validateReferralNumber = async (referralNumber?: string) => {
  if (!referralNumber) return;

  const existingReferral = await prisma.user.findUnique({
    where: { referralNumber },
  });

  if (!existingReferral) {
    throw new ApiError("Invalid referral code", 400);
  }
};
