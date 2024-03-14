import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { User } from 'src/auth/user.model';
import { TripRepository } from './trip.repository';
import { Trip } from './trip.model';

@Injectable()
export class TripService {
  constructor(private tripRepository: TripRepository) {}

  async createTrip(
    createTripDto: CreateTripDto,
    user: User,
  ): Promise<CreateTripDto> {
    return this.tripRepository.createTrip(createTripDto, user);
  }

  getTripsByUser(user: User): Promise<Trip[]> {
    return this.tripRepository.getTripsByUser(user);
  }
}
