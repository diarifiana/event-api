import prisma from "../../config/prisma";

export const getEventsService = async () => {
  return await prisma.event.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
};
