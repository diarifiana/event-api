import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const deleteProfileService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    throw new ApiError("Invalid user id", 404);
  }

  await prisma.user.update({
    where: { id: id },
    data: { isDeleted: true, deletedAt: new Date(), email: "" },
  });

  return { message: "account deleted successfully" };
};
