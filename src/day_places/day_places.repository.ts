import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DayPlaces } from './day-places.model';
import { DataSource, Repository } from 'typeorm';
import { DayPlacesDto } from './dto/day-places.dto';
import { Place } from 'src/place/place.model';
import { User } from 'src/auth/user.model';
import { DayListDto } from './dto/day-list.dto';

@Injectable()
export class DayPlacesRepository extends Repository<DayPlaces> {
  constructor(dataSource: DataSource) {
    super(DayPlaces, dataSource.createEntityManager());
  }

  async addPlaceToDay(dto: DayPlacesDto): Promise<DayPlaces> {
    const { placeId, tripId, dateVisiting } = dto;
    let dayPlace = new DayPlaces();
    dayPlace.placeId = placeId;
    dayPlace.tripId = tripId;
    dayPlace.dateVisiting = dateVisiting;
    await dayPlace.save();
    return dayPlace;
  }

  async getDayPlacesByUser(user: User): Promise<DayPlaces[]> {
    const query = this.createQueryBuilder('day_places')
      .leftJoinAndSelect('day_places.tripId', 'trip')
      .leftJoinAndSelect('trip.userId', 'user')
      .select([
        'day_places.placeId',
        'day_places.dateVisiting',
        'day_places.id',
      ])
      .where('trip.userId = :userId', { userId: user.id })
      .andWhere('day_places.tripId = trip.id');

    try {
      const dayPlaces = await query.getMany();
      return dayPlaces
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
