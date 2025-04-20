import { join } from "path";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import fs from "fs/promises";
import { transporter } from "../../lib/nodemailer";

export const handleTransactionService = async (
  transactionId: number,
  action: "accept" | "reject"
) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
    include: {
      user: true,
    },
  });

  if (!transaction) {
    throw new ApiError("Transaction not found", 404);
  }

  if (transaction.status !== "WAITING_CONFIRMATION") {
    throw new ApiError("Transaction cannot be updated at this stage", 400);
  }

  let updateStatus: "DONE" | "REJECTED";
  let templateFile: string;
  let emailSubject: string;

  if (action === "accept") {
    updateStatus = "DONE";
    templateFile = "accepted-transaction-email.hbs";
    emailSubject = "🎉 Your transaction has been accepted!";
  } else {
    updateStatus = "REJECTED";
    templateFile = "rejected-transaction-email.hbs";
    emailSubject = "❌ Your transaction has been rejected";
  }

  const updatedTransaction = await prisma.transaction.update({
    where: { id: transactionId },
    data: { status: updateStatus },
  });

  const templatePath = join(__dirname, `../../templates/${templateFile}`);
  const templateSource = await (await fs.readFile(templatePath)).toString();
  const compiledTemplate = Handlebars.compile(templateSource);
  const html = compiledTemplate({ fullName: transaction.user.fullName });

  await transporter.sendMail({
    to: transaction.user.email,
    subject: emailSubject,
    html,
  });

  return {
    message: `Transaction ${action}ed successfully`,
    data: updatedTransaction,
  };
};
