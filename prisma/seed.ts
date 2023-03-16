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
        password: '$2b$12$km1BHbhYNU5/Ha04cX1jU.ffU6u9MNVIcm6yYhZARILlY7OarzMWy', // 123456
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

  let hotels = await prisma.hotel.findMany({ include: { Rooms: true } });
  if (!hotels[0]) {
    await prisma.hotel.create({
      data: {
        name: 'Driven Resort',
        image: 'https://www.melhoresdestinos.com.br/wp-content/uploads/2021/04/resort-salinas-maragogi-capa-05.jpg',
        Rooms: {
          createMany: {
            data: [
              {
                name: '101',
                capacity: 3,
              },
              {
                name: '102',
                capacity: 3,
              },
              {
                name: '103',
                capacity: 2,
              },
              {
                name: '104',
                capacity: 3,
              },
              {
                name: '105',
                capacity: 1,
              },
              {
                name: '106',
                capacity: 2,
              },
              {
                name: '107',
                capacity: 3,
              },
              {
                name: '108',
                capacity: 1,
              },
              {
                name: '109',
                capacity: 2,
              },
              {
                name: '110',
                capacity: 3,
              },
            ],
          },
        },
      },
      include: { Rooms: true },
    });

    await prisma.hotel.create({
      data: {
        name: 'Driven Palace',
        image: 'https://carltonhoteis.com.br/wp-content/uploads/2019/08/palace-banner.jpg',
        Rooms: {
          createMany: {
            data: [
              {
                name: '101',
                capacity: 1,
              },
              {
                name: '102',
                capacity: 1,
              },
              {
                name: '103',
                capacity: 1,
              },
              {
                name: '104',
                capacity: 2,
              },
              {
                name: '201',
                capacity: 1,
              },
              {
                name: '202',
                capacity: 2,
              },
              {
                name: '203',
                capacity: 2,
              },
              {
                name: '204',
                capacity: 1,
              },
              {
                name: '301',
                capacity: 2,
              },
              {
                name: '302',
                capacity: 2,
              },
              {
                name: '303',
                capacity: 2,
              },
              {
                name: '304',
                capacity: 2,
              },
            ],
          },
        },
      },
      include: { Rooms: true },
    });
  }
  let booking = await prisma.booking.findFirst();
  if (!booking) {
    await prisma.booking.createMany({
      data: [
        {
          userId: 1,
          roomId: 2,
        },
        {
          userId: 1,
          roomId: 2,
        },
        {
          userId: 1,
          roomId: 2,
        },
        {
          userId: 1,
          roomId: 4,
        },
        {
          userId: 1,
          roomId: 4,
        },
        {
          userId: 1,
          roomId: 11,
        },
        {
          userId: 1,
          roomId: 12,
        },
        {
          userId: 1,
          roomId: 10,
        },
        {
          userId: 1,
          roomId: 16,
        },
        {
          userId: 1,
          roomId: 20,
        },
        {
          userId: 1,
          roomId: 21,
        },
        {
          userId: 1,
          roomId: 18,
        },
      ],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
