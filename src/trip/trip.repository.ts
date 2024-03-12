import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Trip } from './trip.model';
import { CreateTripDto } from './dto/create-trip.dto';
import { User } from 'src/auth/user.model';

@Injectable()
export class TripRepository extends Repository<Trip> {
  private logger = new Logger('TripRepository');

  constructor(dataSource: DataSource) {
    super(Trip, dataSource.createEntityManager());
  }

  async createTrip(
    createTripDto: CreateTripDto,
    user: User,
  ): Promise<CreateTripDto> {
    const { date_start, date_finish } = createTripDto;

    const trip = new Trip();
    trip.date_start = date_start;
    trip.date_finish = date_finish;
    trip.city = 'Великий Новгород';
    trip.userId = user.id;

    try {
      await trip.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a trip for user "${user.username}". 
      Data: ${JSON.stringify(createTripDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return trip;
  }

  async getTrips(
    user: User  
  ): Promise<Trip[]> {
    const query = this.createQueryBuilder('trip');

   query.where('trip.userId = :userId', {userId: user.id});

    try {
      const trips = await query.getMany();
      return trips; 
    } catch (error) {
      throw new InternalServerErrorException();
    }
    
  }
}
