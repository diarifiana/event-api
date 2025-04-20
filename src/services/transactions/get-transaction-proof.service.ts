import prisma from "../../config/prisma";

export const getTransactionProofService = async (transactionId: number) => {
  const transactionProof = await prisma.transaction.findUnique({
    where: {
      id: transactionId,
    },
    select: {
      id: true,
      userId: true,
      paymentProof: true,
      status: true,
    },
  });

  return transactionProof;
};
