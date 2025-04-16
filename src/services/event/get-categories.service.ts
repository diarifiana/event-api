import prisma from "../../config/prisma";

export const getCategoriesService = async () => {
  const categories = await prisma.category.findMany();

  return categories;
};
