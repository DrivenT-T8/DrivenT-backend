import bookingRepository from '@/repositories/booking-repository';
import { notFoundError } from '../../src/errors/not-found-error';
import bookingService from '../../src/services/booking-service';
import bookingRoomById from '@/services/booking-service';
describe('getBooking', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should return the booking for the user', async () => {
    const DATE_TO_USE = new Date('2022-03-15T12:00:00.000Z');
    const id = 1;
    const updatedAt = DATE_TO_USE;
    const createdAt = DATE_TO_USE;
    const userId = 1;
    const roomId = 2;
    const Room = { id: 1, name: '', capacity: 1, hotelId: 1, updatedAt, createdAt };
    const booking = { userId, roomId, updatedAt, createdAt, id, Room };
    jest.spyOn(bookingRepository, 'findByUserId').mockResolvedValue(booking);

    const result = await bookingService.getBooking(userId);

    expect(bookingRepository.findByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual(booking);
  });

  it('should throw an error if no booking is found for the user', async () => {
    const userId = 10000;
    jest.spyOn(bookingRepository, 'findByUserId').mockResolvedValue(undefined);

    await expect(bookingService.getBooking(userId)).rejects.toEqual(notFoundError());
  });
});
 




