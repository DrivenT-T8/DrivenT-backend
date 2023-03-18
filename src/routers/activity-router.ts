import { getActivityByIdDate, getActivityDates } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const activityRouter = Router();

activityRouter.all("/*", authenticateToken).get("/", getActivityDates).get("/:activityDateId", getActivityByIdDate);

export { activityRouter };
