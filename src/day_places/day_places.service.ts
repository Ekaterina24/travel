import { Injectable } from '@nestjs/common';
import { DayPlacesDto } from './dto/day-places.dto';
import { DayPlacesRepository } from './day_places.repository';
import { DayPlaces } from './day-places.model';
import { User } from 'src/auth/user.model';
import { DeleteResult } from 'typeorm';

@Injectable()
export class DayPlacesService {
  constructor(private dayPlacesRepository: DayPlacesRepository) {}

  async addPlaceToDay(user: User, dto: DayPlacesDto): Promise<DayPlaces> {
    return this.dayPlacesRepository.addPlaceToDay(user, dto);
  }

  getDayPlacesByUser(user: User, date: string): Promise<DayPlaces[]> {
    return this.dayPlacesRepository.getDayPlacesByUser(user, date);
  }

  async deletePlaceByRecordId(
    user: User,
    id: string 
  ): Promise<DeleteResult> {
    // const query = this.dayPlacesRepository.createQueryBuilder('day_places')
    // .where('day_places.userId = :userId', { userId: user.id })

    return await this.dayPlacesRepository.delete({placeId: id, userId: user.id});
  }
}
