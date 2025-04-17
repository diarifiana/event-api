import prisma from "../../config/prisma";

export const getEventsByCategoryService = async (category: string) => {
  const data = await prisma.event.findMany({
    where: {
      category: {
        name: category,
      },
    },
  });

  return data;
};
