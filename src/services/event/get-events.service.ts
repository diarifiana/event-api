import prisma from "../../config/prisma";

export const getEventsService = async () => {
  const events = await prisma.event.findMany();

  return events;
};
