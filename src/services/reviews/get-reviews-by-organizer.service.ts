import prisma from "../../config/prisma";

export const getReviewsOrganizerService = async (id: number) => {
  // tampilkan reviews based on organizer

  return await prisma.review.findMany({
    where: {
      transaction: {
        ticket: {
          event: {
            organizerId: id,
          },
        },
      },
    },
  });
};
