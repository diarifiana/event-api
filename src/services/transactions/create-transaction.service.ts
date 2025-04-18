import { Transaction } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { validateCoupon } from "../../validators/validateCoupon";
import { validateVoucher } from "../../validators/validateVoucher";

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

  const couponAmount = validateCoupon(body);
  const voucherAmount = validateVoucher(body);

  // calculate A = qty * ticket
  // calculate B = coupon amount + voucher amount
  // jika A < B, throw error

  const totalToPay =
    ticket.price * body.qty - ((await couponAmount) + (await voucherAmount));

  if (totalToPay < 0) {
    throw new ApiError("Discount cannot be claimed", 400);
  }

  //=================== perlu tambah penghitungan point =============//

  // jika coupon & voucher valid, create transaction
  // ubah isClaimed coupon to true & decrease qty voucher
  // decrease qty ticket
  // calculate amount = qty * ticket - (coupon amount + voucher amount)

  const newData = await prisma.$transaction(async (tx) => {
    if ((await couponAmount) > 0) {
      await tx.referralCoupon.update({
        where: { referralCoupon: body.referralCouponCode },
        data: { isClaimed: true },
      });
    }

    if ((await voucherAmount) > 0) {
      await tx.voucher.update({
        where: { code: body.voucherCode },
        data: { qty: { decrement: body.qty } },
      });
    }

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
