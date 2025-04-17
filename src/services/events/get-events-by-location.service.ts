import { Location } from "@prisma/client";
import prisma from "../../config/prisma";

export const getEventsByLocationService = async (location: Location) => {
  return await prisma.event.findMany({
    where: { location },
  });
};
