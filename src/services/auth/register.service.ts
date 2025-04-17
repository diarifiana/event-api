import { Role, User } from "@prisma/client";
import { nanoid } from "nanoid";
import prisma from "../../config/prisma";
import { hashPassword } from "../../lib/argon";
import { addMonths } from "../../utils/addMonth";
import { ApiError } from "../../utils/api-error";
import { validateReferralNumber } from "../../validators/validateReferralNumber";

// input data body
// user data
// referral yang dipake
// organizer data

// ngecek apakah user sudah terdaftar
// apakah referral keisi & benar
// hasing password
// table user (dapet id user yang baru)
// kalaua refereal kesisi dan benar -> bikin table voucher -> bikin table point (refernsinya dari id user yang baru)
// dikirim email
// interface RegisterBody {
//   body: Omit<User, "referralNumber">;
//   referralNumber?: string;
// }

interface RegisterBody {
  body: Omit<User, "referralNumber" | "role"> & { role: "USER" | "ADMIN" };
  referralNumber?: string;
  organizerData?: {
    name: string;
  };
}

export const registerService = async (registerBody: RegisterBody) => {
  const existingUser = await prisma.user.findFirst({
    where: { email: registerBody.body.email },
  });

  if (existingUser) {
    throw new ApiError("Email already exists", 400);
  }

  // validasi referral number
  await validateReferralNumber(registerBody.referralNumber);

  const hashedPassword = await hashPassword(registerBody.body.password);

  const code = nanoid(6);
  const newUser = await prisma.$transaction(async (tx) => {
    // const newUser = await prisma.user.create({
    const createdUser = await tx.user.create({
      data: {
        ...registerBody.body,
        password: hashedPassword,
        referralNumber: code,
        role: registerBody.body.role as Role,
      },
      include: {
        organizer: true,
      },
      omit: { password: true },
    });

    if (registerBody.body.role === "ADMIN" && registerBody.organizerData) {
      await tx.organizer.create({
        data: {
          userId: createdUser.id,
          name: registerBody.organizerData.name,
        },
      });
    }

    if (registerBody.referralNumber) {
      const referral = await tx.user.findUnique({
        where: { referralNumber: registerBody.referralNumber },
      });
      const couponCode = nanoid(8);

      if (referral) {
        // BUAT VOUCHER UNTUK USER BARU
        await tx.referralCoupon.create({
          data: {
            userId: createdUser.id,
            referralCoupon: couponCode,
            amount: 30000,
            expiredAt: addMonths(new Date(), 3),
          },
        });
        const now = new Date();
        const existingPoint = await tx.pointDetail.findFirst({
          where: {
            userId: referral.id,
            expiredAt: {
              gt: now,
            },
          },
        });

        if (existingPoint) {
          // ✅ TAMBAH NILAI POINT-NYA
          await tx.pointDetail.update({
            where: { id: existingPoint.id },
            data: {
              amount: existingPoint.amount + 30000,
            },
          });
        } else {
          // KALAU BELUM ADA POINT, BUAT BARU
          await tx.pointDetail.create({
            data: {
              userId: referral.id,
              amount: 30000,
              expiredAt: addMonths(new Date(), 3),
            },
          });
        }
      }
    }
    return createdUser;
  });

  //   const templatePath = join(__dirname, "../../templates/welcome-email.hbs");

  //   const templateSource = await (await fs.readFile(templatePath)).toString();

  //   const compiledTemplate = Handlebars.compile(templateSource);

  //   const html = compiledTemplate({ fullName: registerBody.body.fullName });

  // transporter.sendMail({
  //   to: body.email,
  //   subject: "welcome to my app",
  //   html,
  // });

  return newUser;
};
