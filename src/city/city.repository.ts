import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource, Long, Repository } from 'typeorm';
import { City } from './city.model';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class CityRepository extends Repository<City> {
  private logger = new Logger('TripRepository');

  constructor(dataSource: DataSource) {
    super(City, dataSource.createEntityManager());
  }

  async createCity(createCityDto: CreateCityDto): Promise<City> {
    const { name, lat, lon } = createCityDto;

    const city = new City();
    city.name = name;
    city.latitude = Number(lat);
    city.longitude = Number(lon);

    try {
      await city.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a trip for user "${city.name}". 
              Data: ${JSON.stringify(createCityDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return city;
    }
    
    async getCityList(): Promise<City[]> {
        const query = this.createQueryBuilder('city');
    
        try {
          const cities = await query.getMany();
          return cities; 
        } catch (error) {
          throw new InternalServerErrorException();
        }
        
      }
}
