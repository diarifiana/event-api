import { Transaction } from "@prisma/client";
import prisma from "../../config/prisma";

export default async function createTransactionService(body: Transaction) {
  const newTransaction = await prisma.transaction.create({
    data: {
      user: {
        connect: { id: body.userId },
      },
      ticket: {
        connect: { id: body.ticketId },
      },
      coupon: {
        connect: { id: body.couponId },
      },
      voucher: {
        connect: { id: body.voucherId },
      },
      quantity: body.quantity,
      totalAmount: body.totalAmount,
      status: body.status,
      usePoints: body.usePoints,
      paymentProof: body.paymentProof,
      PaymentExpiredAt: body.PaymentExpiredAt,
      confirmationExpiredAt: body.confirmationExpiredAt,
      organizer: {
        connect: { id: 1 },
      },
      isDeleted: body.isDeleted,
    },
  });

  return newTransaction;
}
