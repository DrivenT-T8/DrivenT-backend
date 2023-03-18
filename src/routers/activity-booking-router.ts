import { bookActivity, getActivityBooking } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const activityBookingRouter = Router();

activityBookingRouter.all("/*", authenticateToken).post("/", bookActivity).get("/", getActivityBooking);

export { activityBookingRouter };
