import { Injectable } from '@nestjs/common';
import { DayPlacesDto } from './dto/day-places.dto';
import { DayPlacesRepository } from './day_places.repository';
import { Place } from 'src/place/place.model';
import { DayPlaces } from './day-places.model';

@Injectable()
export class DayPlacesService {
  constructor(private dayPlacesRepository: DayPlacesRepository) {}

  async addPlaceToDay(dto: DayPlacesDto): Promise<DayPlaces> {
    return this.dayPlacesRepository.addPlaceToDay(dto);
  }
}
