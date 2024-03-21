import { Injectable } from '@nestjs/common';
import { CityRepository } from './city.repository';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './city.model';

@Injectable()
export class CityService {
    constructor(private cityRepository: CityRepository) { }
    
    createCity(
        createCityDto: CreateCityDto
      ): Promise<City> {
        return this.cityRepository.createCity(createCityDto);
    }
    
    getCityList(): Promise<City[]> {
        return this.cityRepository.getCityList();
      }

}
