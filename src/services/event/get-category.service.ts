import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const getCategoryService = async (slug: string) => {
  const category = await prisma.category.findFirst({
    where: { slug: slug, isDeleted: false },
  });

  if (!category) {
    return new ApiError("Product not found", 400);
  }

  return category;
};
