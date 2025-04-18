// jika user pakai coupon, cari couponnya by referralCouponCode di table ReferralCoupon
// jika tidak ada data, throw error
// cek apakah isClaimed is true, jika true, throw error

import { Transaction } from "@prisma/client";
import prisma from "../config/prisma";
import { ApiError } from "../utils/api-error";

export const validateCoupon = async (body: Transaction) => {
  if (body.referralCouponCode !== "") {
    const coupon = await prisma.referralCoupon.findFirst({
      where: { referralCoupon: body.referralCouponCode },
    });

    if (!coupon || coupon.isClaimed === true) {
      throw new ApiError("Coupon invalid", 400);
    } else {
      return coupon.amount;
    }
  }
  return 0;
};
