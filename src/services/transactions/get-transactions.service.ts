import prisma from "../../config/prisma";

export const getTransactionsService = async () => {
  return await prisma.transaction.findMany({});
};
