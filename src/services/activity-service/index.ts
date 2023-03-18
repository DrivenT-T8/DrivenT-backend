import { paymentRequiredError, unauthorizedError } from "@/errors";
import activityRepository from "@/repositories/activity-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getActivityDates(userId: number) {
  await verifyEnrollmentAndTicketOrFail(userId);

  const activityDates = await activityRepository.findActivityDates();

  return activityDates;
}

async function getActivityByDate(userId: number, dateId: number) {
  await verifyEnrollmentAndTicketOrFail(userId);

  const events = await activityRepository.findActivitiesByDateId(dateId);

  return events;
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

const activityServices = {
  getActivityDates,
  getActivityByDate,
};

export default activityServices;
