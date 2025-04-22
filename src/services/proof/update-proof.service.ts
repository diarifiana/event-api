import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const updateProof = async (uuid: string, authUserId: number) => {
  // cek transaksi based on uuid, kalo ga ada throw error
  // kalo ada pastikan id user dalam token itu sama dengan id user yg ada di table transaction
  // kalo id user dalam token ga sama dengan id user di transaksi maka throw error unauthorized
  // kalo udh pake image, maka upload image tsb ke cloudinary
  // kalo sama dan image udh di upload, ubah status transacrion tersebut menjadi waiting for confirmation
  //  simpen secure_url ke kolom payment proof
  // return success

  const transaction = await prisma.transaction.findFirst({ where: { uuid } });

  if (!transaction) {
    throw new ApiError("Invalid transaction uuid", 400);
  }

  if (transaction.userId !== authUserId) {
    throw new ApiError("Unauthorized", 401);
  }

  await prisma.transaction.update({
    where: { uuid },
    data: { status: "WAITING_CONFIRMATION" },
  });

  return { message: "Upload payment proof success" };
};
