import { Injectable } from '@nestjs/common';
import { DayPlacesDto } from './dto/day-places.dto';
import { DayPlacesRepository } from './day_places.repository';
import { Place } from 'src/place/place.model';
import { DayPlaces } from './day-places.model';
import { User } from 'src/auth/user.model';
import { DayListDto } from './dto/day-list.dto';

@Injectable()
export class DayPlacesService {
  constructor(private dayPlacesRepository: DayPlacesRepository) {}

  async addPlaceToDay(dto: DayPlacesDto): Promise<DayPlaces> {
    return this.dayPlacesRepository.addPlaceToDay(dto);
  }


  

  getDayPlacesByUser(user: User): Promise<DayPlaces[]> {
    return this.dayPlacesRepository.getDayPlacesByUser(user);
  }
}
