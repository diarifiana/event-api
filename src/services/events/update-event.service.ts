import { Event } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { generateSlug } from "../../utils/generateSlug";

export const updateEventService = async (id: number, body: Partial<Event>) => {
  const event = await prisma.event.findFirst({
    where: { id: id },
  });
  if (!event) {
    throw new ApiError("Event not found", 404);
  }

  if (body.name) {
    const existingEvent = await prisma.event.findFirst({
      where: { name: body.name },
    });
    if (existingEvent && existingEvent.id !== id) {
      throw new ApiError("Product name already exists", 400);
    }
    body.slug = generateSlug(body.name);
  }

  await prisma.event.update({
    where: { id: id },
    data: body,
  });
  return { message: "Updated successfully" };
};
