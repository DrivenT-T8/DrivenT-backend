import { prisma } from "@/config";

async function findActivityDates() {
  return prisma.activityDate.findMany();
}

async function findActivitiesByDateId(dateId: number) {
  return prisma.activityLocal.findMany({
    include: {
      Activities: {
        where: {
          dateId: dateId,
        },
        include: {
          ActivityBooking: true,
        },
      },
    },
  });
}

async function findAcitivityById(activityId: number) {
  return prisma.activities.findFirst({
    where: { id: activityId },
    include: { ActivityBooking: true },
  });
}

const activityRepository = {
  findActivityDates,
  findActivitiesByDateId,
  findAcitivityById,
};

export default activityRepository;
