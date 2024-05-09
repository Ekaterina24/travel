import {
  Injectable
} from '@nestjs/common';
import { GetCategoryDto } from './dto/get-category.dto';
import { GetPlaceByCityFilterDto } from './dto/get-place-by-city-filter.dto';
import { GetPlacesFilterDto } from './dto/get-place-filter.dto';
import { Place } from './place.model';
import { PlaceRepository } from './place.repository';

@Injectable()
export class PlaceService {
  constructor(private placeRepository: PlaceRepository) {}

  getPlaces(dto: GetPlaceByCityFilterDto): Promise<Place[]> {
    return this.placeRepository.getPlaces(dto);
  }
  
  getCategoryList(): Promise<GetCategoryDto[]> {
    return this.placeRepository.getCategoryList();
    }
    
    getPlaceById(id: string): Promise<Place> {
        return this.placeRepository.getPlaceById(id);
      }

  insertDataFromApi(filterDto: GetPlacesFilterDto): Promise<void> {
    return this.placeRepository.insertDataFromApi(filterDto);
  }

  updateDataFromApi(filterDto: GetPlacesFilterDto): Promise<boolean> {
    return this.placeRepository.updateDataFromApi(filterDto);
  }

//   async updatePlaceDate(id: string, date: string): Promise<Place> {
//     const place = await this.placeRepository.getPlaceById(id);
//     // place.date = date;
//     await place.save();
//     return place;
//     }
    

    // getPlacesByDay(date: string): Promise<Place[]>  {
    //     return this.placeRepository.getPlacesByDay(date);
    // }
}
