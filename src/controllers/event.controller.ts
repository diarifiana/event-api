import { NextFunction, Request, Response } from "express";
import { createEventService } from "../services/events/create-event.service";
import { getEventsService } from "../services/events/get-events.service";
import { getEventService } from "../services/events/get-event.service";
import { getEventsByCategoryService } from "../services/events/get-events-by-category.service";
import { getEventsByLocationService } from "../services/events/get-events-by-location.service";
import { Location } from "@prisma/client";

export const createEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createEventService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getEventsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getEventsService();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getEventService(Number(req.params.id));
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getEventsByCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getEventsByCategoryService(req.params.slug);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getEventsByLocationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getEventsByLocationService(
      req.params.slug as Location
    );
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
