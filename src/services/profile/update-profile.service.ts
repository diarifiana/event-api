import { User } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const updateProfileService = async (id: number, body: Partial<User>) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    throw new ApiError("Invalid user id", 404);
  }

  if ("password" in body) {
    throw new ApiError("Password cannot be updated via this route", 400);
  }
  const { password, ...updateData } = body;

  await prisma.user.update({
    where: { id: id, isDeleted: false },
    data: updateData,
  });

  return { message: "Profile updated successfully" };
};
