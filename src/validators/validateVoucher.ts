// jika user pakai voucher, cari vouchernya by vouchercode di table vouchers
// jika tidak ada data, throw error

import { Transaction } from "@prisma/client";
import prisma from "../config/prisma";
import { ApiError } from "../utils/api-error";

// cek apakah qty voucher is >= 0, jika tidak, throw error
export const validateVoucher = async (body: Transaction) => {
  if (body.voucherCode !== "") {
    const voucher = await prisma.voucher.findFirst({
      where: { code: body.voucherCode },
    });

    if (!voucher || voucher.qty <= 0) {
      throw new ApiError("Voucher invalid", 400);
    } else {
      return voucher.discountAmount;
    }
  }
  return 0;
};
