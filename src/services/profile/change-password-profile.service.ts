import prisma from "../../config/prisma";
import { comparePassword, hashPassword } from "../../lib/argon";
import { ApiError } from "../../utils/api-error";

// interface ChangePasswordInput {
//   id: number;
//   oldPassword: string;
//   newPassword: string;
// }

export const changePasswordService = async (
  id: number,
  oldPassword: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const isPasswordValid = await comparePassword(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new ApiError("Old password is incorrect", 401);
  }

  const hashedNewPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: id },
    data: { password: hashedNewPassword },
  });

  return { message: "Password changed successfully" };
};
