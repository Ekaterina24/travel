import { Injectable } from '@nestjs/common';
import { DayPlacesDto } from './dto/day-places.dto';
import { DayPlacesRepository } from './day_places.repository';
import { DayPlaces } from './day-places.model';
import { User } from 'src/auth/user.model';
import { DeleteResult } from 'typeorm';

@Injectable()
export class DayPlacesService {
  constructor(private dayPlacesRepository: DayPlacesRepository) {}

  async addPlaceToDay(dto: DayPlacesDto): Promise<DayPlaces> {
    return this.dayPlacesRepository.addPlaceToDay(dto);
  }

  getDayPlacesByUser(user: User, date: string): Promise<DayPlaces[]> {
    return this.dayPlacesRepository.getDayPlacesByUser(user, date);
  }

  async deletePlaceByRecordId(
    id: string 
  ): Promise<DeleteResult> {
    return await this.dayPlacesRepository.delete({placeId: id});
  }
}
