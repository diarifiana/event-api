import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config/env";
import prisma from "../../config/prisma";
import { comparePassword } from "../../lib/argon";
import { ApiError } from "../../utils/api-error";

export const loginService = async (body: Pick<User, "email" | "password">) => {
  // cek dlu email apakah sudah ada di db ato belom
  // kalo ga ada throw erro
  //  kalo ada cek pwnya sesuai ato tidak
  // kalo ga sesuai throw error
  // kalo sesuai kirim data user tsb dan juga token jwt

  const { email, password } = body;

  const user = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (!user) {
    throw new ApiError("Invalid Credentials", 400);
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError("Invalid Credentials", 400);
  }

  const tokenPayload = { id: user.id, role: user.role };

  // generate jwt
  const token = sign(tokenPayload, JWT_SECRET_KEY!, { expiresIn: "3h" });

  const { password: pw, ...userWithoutPassword } = user;
  return { ...userWithoutPassword, token };
};
