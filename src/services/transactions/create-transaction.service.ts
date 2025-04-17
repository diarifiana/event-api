import { Transaction } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const createTransactionService = async (body: Transaction) => {
  const ticket = await prisma.ticket.findFirst({
    where: { id: body.ticketId },
  });

  if (!ticket) {
    throw new ApiError("Ticket invalid", 400);
  }

  if (body.qty > ticket.qty) {
    throw new ApiError("Insufficient stock", 400);
  }

  // jika user pakai coupon, cari couponnya by referralCouponCode di table ReferralCoupon
  // jika tidak ada data, throw error
  // cek apakah isClaimed is true, jika true, throw error
  const coupon = await prisma.referralCoupon.findFirst({
    where: { referralCoupon: body.referralCouponCode },
  });

  if (!coupon || coupon.isClaimed === true) {
    throw new ApiError("Coupon invalid", 400);
  }

  // jika user pakai voucher, cari vouchernya by vouchercode di table vouchers
  // jika tidak ada data, throw error
  // cek apakah qty voucher is >= 0, jika tidak, throw error

  const voucher = await prisma.voucher.findFirst({
    where: { code: body.voucherCode },
  });

  if (!voucher || voucher.qty <= 0) {
    throw new ApiError("Voucher invalid", 400);
  }

  // calculate A = qty * ticket
  // calculate B = coupon amount + voucher amount
  // jika A < B, throw error

  const totalToPay =
    ticket.price * body.qty - coupon.amount + voucher.discountAmount;

  if (totalToPay < 0) {
    throw new ApiError("Discount cannot be claimed", 400);
  }

  //=================== perlu tambah penghitungan point =============//

  // jika coupon & voucher valid, create transaction
  // ubah isClaimed coupon to true & decrease qty voucher
  // decrease qty ticket
  // calculate amount = qty * ticket - (coupon amount + voucher amount)

  const newData = await prisma.$transaction(async (tx) => {
    await tx.referralCoupon.update({
      where: { referralCoupon: body.referralCouponCode },
      data: { isClaimed: true },
    });

    await tx.voucher.update({
      where: { code: body.voucherCode },
      data: { qty: { decrement: body.qty } },
    });

    await tx.ticket.update({
      where: { id: body.ticketId },
      data: { qty: { decrement: body.qty } },
    });

    return await tx.transaction.create({
      data: { ...body, totalAmount: totalToPay },
    });
  });

  //=========== perlu install redis ===============//
  //   await userTransactionQueue.add(
  //     "new-transaction",
  //     {
  //       uuid: newData.uuid,
  //     },
  //     {
  //       delay: 300000,
  //       removeOnComplete: true,
  //       attempts: 3,
  //       backoff: { type: "exponential", delay: 1000 },
  //     }
  //   );

  return { messsage: "Created successfully", newData };
};
