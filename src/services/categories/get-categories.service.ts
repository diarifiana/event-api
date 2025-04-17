import prisma from "../../config/prisma";

export const getCategoriesService = async () => {
  return await prisma.category.findMany();
};
