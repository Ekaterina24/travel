import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/user.model';
import { Place } from './place.model';
import { catchError, map } from 'rxjs';
import axios from 'axios';
import { GetPlaceApiDto } from './dto/get-place-api.dto';
import { GetPlacesFilterDto } from './dto/get-place-filter.dto';
import { DayPlaces } from 'src/day_places/day-places.model';
import { City } from 'src/city/city.model';
import { GetPlaceByCityFilterDto } from './dto/get-place-by-city-filter.dto';

@Injectable()
export class PlaceRepository extends Repository<Place> {
  private logger = new Logger('PlaceRepository');

  constructor(dataSource: DataSource) {
    super(Place, dataSource.createEntityManager());
  }

  async getPlaces(dto: GetPlaceByCityFilterDto): Promise<Place[]> {
    const { cityId } = dto;
    const query = this.createQueryBuilder('place');

    if (cityId) {
      query.andWhere('(place.cityId = :cityId)', {
        cityId: cityId,
      });
    }

    try {
      const places = await query.getMany();
      return places;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAllPlaces(): Promise<Place[]> {
    const query = this.createQueryBuilder('place');

    try {
      const places = await query.getMany();
      return places;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getPlacesFromApi(
    filterDto: GetPlacesFilterDto,
  ): Promise<GetPlaceApiDto[]> {
    const { q, type, cityId } = filterDto;
    let response;
    let page = 1;
    const newPlaces: GetPlaceApiDto[] = [];
    let total;
    let number;

    if (page == 1) {
      response = await axios({
        method: 'GET',
        url: `https://catalog.api.2gis.com/3.0/items?q=${q} &fields=items.address,items.description,items.point,items.schedule&type=adm_div.country,adm_div.city,${type}&key=4efb54ac-4c76-4b0a-901a-e352124932de&page=${page}`,
      }).catch(() => {
        throw new ForbiddenException('API not available');
      });
      total = Number(JSON.stringify(response.data.result.total));
    }

    if (total <= 50) {
      number = Math.round(total / 10) + 1;
    } else {
      number = 6;
    }

    for (page; page < number; page++) {
      response = await axios({
        method: 'GET',
        url: `https://catalog.api.2gis.com/3.0/items?q=${q} &fields=items.address,items.description,items.point,items.schedule&type=adm_div.country,adm_div.city,${type}&key=4efb54ac-4c76-4b0a-901a-e352124932de&page=${page}`,
      }).catch(() => {
        throw new ForbiddenException('API not available');
      });

      const str = JSON.stringify(response.data.result.items);

      const parse = JSON.parse(str);
      for (let i = 0; i < parse.length; i++) {
        let el = parse[i];
        const place = new GetPlaceApiDto();
        place.id = el.id;
        place.name = el.name;
        if (el.description == undefined) {
          place.description = ' ';
        } else place.description = el.description;
        place.type = el.type;
        if (el.subtype == undefined) {
          place.subtype = ' ';
        } else place.subtype = el.subtype;
        place.lat = el.point.lat;
        place.lon = el.point.lon;
        if (el.address == undefined) {
          place.addressId = ' ';
        } else place.addressId = el.address.building_id;
        place.cityId = cityId;
        newPlaces.push(place);
      }
    }

    return newPlaces;
  }

  async insertDataFromApi(filterDto: GetPlacesFilterDto): Promise<void> {
    const data = await this.getPlacesFromApi(filterDto);

    data.map((item) => {
      const place = new Place();
      place.id = item.id;
      if (item.name == undefined) {
        place.name = ' ';
      } else place.name = item.name;
      if (item.description == undefined) {
        place.description = ' ';
      } else place.description = item.description;
      place.addressId = item.addressId;
      place.typePlace = item.type;
      place.subTypePlace = item.subtype;
      place.longitude = item.lon;
      place.latitude = item.lat;
      place.is_visited = false;
      place.is_favourite = false;
      place.updated_at = new Date();
      place.cityId = item.cityId;

      try {
        place.save();
      } catch (error) {
        console.log(error.code);
        if (error.code === '23505') {
          throw new ConflictException(`Место с ID ${place.id} уже существует.`);
        } else {
          throw new InternalServerErrorException();
        }
      }
      return place;
    });
  }

  mapperDtoToPlace(dto: GetPlaceApiDto): Place {
    const {
      id,
      name,
      description,
      type,
      subtype,
      lat,
      lon,
      addressId,
      cityId,
    } = dto;
    const place = new Place();
    place.id = id;
    if (name == undefined) {
      place.name = ' ';
    } else place.name = name;
    if (description == undefined) {
      place.description = ' ';
    } else place.description = description;
    place.addressId = addressId;
    place.typePlace = type;
    place.subTypePlace = subtype;
    place.longitude = lon;
    place.latitude = lat;
    place.updated_at = new Date();
    place.cityId = cityId;
    return place;
  }

  async getPlaceById(id: string): Promise<Place> {
    const found = await this.findOne({
      where: {
        id: id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Место с ID ${id} не найдено.`);
    }
    return found;
  }

  async updateDataFromApi(filterDto: GetPlacesFilterDto): Promise<boolean> {
    const newData = await this.getPlacesFromApi(filterDto);
    newData.map((item) => {
      let oldPlace = this.getPlaceById(item.id);
      oldPlace.then((it) => {
        it.id = item.id;
        if (item.name == undefined) {
          it.name = ' ';
        } else it.name = item.name;
        if (item.description == undefined) {
          it.description = ' ';
        } else it.description = item.description;

        if (item.addressId == undefined) {
          it.addressId = ' ';
        } else it.addressId = item.addressId;

        it.addressId = item.addressId;
        it.typePlace = item.type;
        if (item.subtype == undefined) {
          it.subTypePlace = ' ';
        } else it.subTypePlace = item.subtype;
        it.longitude = item.lon;
        it.latitude = item.lat;
        it.updated_at = new Date();
        it.cityId = item.cityId;
        it.save();
      });
    });
    return true;
  }

  // async getPlacesByDay(date: string): Promise<Place[]> {
  //   const query = this.createQueryBuilder('place');
  //   query.andWhere('place.date = :date', { date: date });

  //   try {
  //     const places = await query.getMany();
  //     return places;
  //   } catch (error) {
  //     throw new InternalServerErrorException();
  //   }
  // }
}
