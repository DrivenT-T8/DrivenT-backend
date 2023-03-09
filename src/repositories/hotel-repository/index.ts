import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.$queryRaw`
    SELECT *,  (SELECT json_agg(json_build_object('id',"Room".id, 'name', "Room".name, 'capacity', "Room".capacity, 'hotelId', "Room"."hotelId", 'booking',(SELECT COUNT("Booking"."roomId") FROM "Booking" WHERE "Booking"."roomId"="Room".id
))) FROM "Room"  WHERE "Room"."hotelId"="Hotel".id ) AS "Rooms" FROM "Hotel" WHERE "Hotel".id =${hotelId}`;}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
};

export default hotelRepository;
