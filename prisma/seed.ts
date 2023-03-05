import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'lulu@gmail.com',
        password: '123456',
      },
    });
  }

  let enrollment = await prisma.enrollment.findFirst();
  if (!enrollment) {
    enrollment = await prisma.enrollment.create({
      data: {
        name: 'lulu',
        cpf: '77876066496',
        birthday: '2023-01-30T01:59:14.048Z',
        phone: '(21)98559-9999',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  let address = await prisma.address.findFirst();
  if (!address) {
    address = await prisma.address.create({
      data: {
        cep: '87020-260',
        street: 'Rua Secreta',
        city: 'Corococo',
        state: 'PR',
        number: '1001',
        neighborhood: 'nada',
        enrollmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  let ticketTypes = await prisma.ticketType.findFirst();
  if (!ticketTypes) {
    await prisma.ticketType.create({
      data: {
        name: 'Online',
        price: 10000,
        isRemote: true,
        includesHotel: false,
        updatedAt: dayjs().toDate(),
      },
    });
    await prisma.ticketType.create({
      data: {
        name: 'Presencial',
        price: 25000,
        isRemote: false,
        includesHotel: false,
        updatedAt: dayjs().toDate(),
      },
    });
    await prisma.ticketType.create({
      data: {
        name: 'Presencial com hotel',
        price: 60000,
        isRemote: false,
        includesHotel: true,
        updatedAt: dayjs().toDate(),
      },
    });
  }

  let hotels = await prisma.hotel.findFirst();
  if (!hotels) {
    hotels = await prisma.hotel.create({
      data: {
        name: 'Hotel Driven',
        image: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        updatedAt: dayjs().toDate(),
      },
    });
  }

  let rooms = await prisma.room.findFirst();
  if (!rooms) {
    await prisma.room.create({
      data: {
        name: '1001',
        capacity: 3,
        hotelId: hotels.id,
        updatedAt: dayjs().toDate(),
      },
    });
    await prisma.room.create({
      data: {
        name: '1002',
        capacity: 2,
        hotelId: hotels.id,
        updatedAt: dayjs().toDate(),
      },
    });
    await prisma.room.create({
      data: {
        name: '1003',
        capacity: 1,
        hotelId: hotels.id,
        updatedAt: dayjs().toDate(),
      },
    });
    await prisma.room.create({
      data: {
        name: '1004',
        capacity: 3,
        hotelId: hotels.id,
        updatedAt: dayjs().toDate(),
      },
    });
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
