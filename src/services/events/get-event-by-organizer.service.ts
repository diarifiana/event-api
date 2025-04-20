import { Organizer } from "@prisma/client";
import prisma from "../../config/prisma";

export const getEventsByOrganizerService = async (organizerId: number) => {
  const events = await prisma.event.findMany({
    where: { organizerId, isDeleted: false },
  });
  if (!events) {
    throw new Error("Event not found");
  }
  return events;
};
