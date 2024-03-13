import { Injectable } from '@nestjs/common';
import { DayPlaces } from './day-places.model';
import { DataSource, Repository } from 'typeorm';
import { DayPlacesDto } from './dto/day-places.dto';
import { Place } from 'src/place/place.model';

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
}
