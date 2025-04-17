import { Event } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { generateSlug } from "../../utils/generateSlug";

export const createEventService = async (body: Event) => {
  const existing = await prisma.event.findFirst({
    where: { name: body.name },
  });

  if (existing) {
    throw new ApiError("Event already exist", 400);
  }

  const slug = generateSlug(body.name);

  const eventNew = await prisma.event.create({
    data: { ...body, slug },
  });

  return { message: "Created successfully", eventNew };
};
