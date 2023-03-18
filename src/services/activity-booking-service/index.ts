import { cannotBookActivityError, notFoundError, paymentRequiredError, unauthorizedError } from "@/errors";
import activityBookingRepository from "@/repositories/activity-booking-repository";
import activityRepository from "@/repositories/activity-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

type BookActivityParams = { userId: number; activityId: number };

async function bookActivity({ userId, activityId }: BookActivityParams) {
  await verifyEnrollmentAndTicketOrFail(userId);

  const activity = await activityRepository.findAcitivityById(activityId);

  if (!activity) throw notFoundError();

  if (activity.capacity <= activity.ActivityBooking.length) throw cannotBookActivityError();

  const activityBooking = await activityBookingRepository.bookActivity({ activityId, userId });

  return { activityBookingId: activityBooking.id };
}

async function getActivityBooking(userId: number) {
  const activityBookingResult = await activityBookingRepository.findActivityBookingByUserId(userId);

  if (!activityBookingResult) throw notFoundError();

  return activityBookingResult;
}

async function verifyEnrollmentAndTicketOrFail(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw unauthorizedError();

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw unauthorizedError();

  if (ticket.status !== "PAID") {
    throw paymentRequiredError();
  }
}

const activityBookingService = {
  bookActivity,
  getActivityBooking,
};

export default activityBookingService;
