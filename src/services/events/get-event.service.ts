import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const getEventService = async (id: number) => {
  const data = await prisma.event.findFirst({
    where: { id },
  });

  if (!data) {
    throw new ApiError("Not found", 404);
  }

  return data;
};
