import { prisma } from '@/config';
import { getRedis, setRedis } from '@/config/redis';

async function findFirst() {
  const eventRedis = await getRedis('event');
  if (!eventRedis) {
    const result = await prisma.event.findFirst();
    await setRedis('event', JSON.stringify(result));
    return result;
  } else {
    const { id, title, backgroundImageUrl, logoImageUrl, startsAt, endsAt } = JSON.parse(eventRedis);
    return { id, title, backgroundImageUrl, logoImageUrl, startsAt, endsAt }
  }
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
