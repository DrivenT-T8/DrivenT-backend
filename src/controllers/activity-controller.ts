import { AuthenticatedRequest } from "@/middlewares";
import activityServices from "@/services/activity-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getActivityDates(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const dateEvent = await activityServices.getActivityDates(userId);

    return res.status(httpStatus.OK).send(dateEvent);
  } catch (error) {
    if (error.name === "PaymentRequiredError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function getActivityByIdDate(req: AuthenticatedRequest, res: Response) {
  const dateId = Number(req.params.eventDateId);

  if (!dateId || dateId < 1) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const { userId } = req;
    const events = await activityServices.getActivityByDate(dateId, userId);

    return res.status(httpStatus.OK).send(events);
  } catch (error) {
    if (error.name === "PaymentRequiredError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
