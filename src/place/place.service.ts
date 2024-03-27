import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Place } from './place.model';
import { PlaceRepository } from './place.repository';
import { GetPlaceApiDto } from './dto/get-place-api.dto';
import { GetPlacesFilterDto } from './dto/get-place-filter.dto';
import { DayPlaces } from 'src/day_places/day-places.model';
import { City } from 'src/city/city.model';
import { GetPlaceByCityFilterDto } from './dto/get-place-by-city-filter.dto';

@Injectable()
export class PlaceService {
  constructor(private placeRepository: PlaceRepository) {}

  // async createTrip(
  //     createTripDto: CreateTripDto,
  //     user: User
  //   ): Promise<CreateTripDto> {
  //     return this.tripRepository.createTrip(createTripDto, user);
  // }

  getPlaces(dto: GetPlaceByCityFilterDto): Promise<Place[]> {
    return this.placeRepository.getPlaces(dto);
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

  

  // async updateUser(
  //     id: number,
  //     newUser: AuthRegisterDto,
  //   ): Promise<UpdateUserDto> {
  //       await this.userRepository.update(id, newUser);
  //       const user = await this.getUserById(id);
  //       user.password = await this.hashPassword(user.password, user.salt);
  //       user.save()
  //     const newDto = new UpdateUserDto();
  //     newDto.username = user.username;
  //     newDto.email = user.email;
  //     return newDto;
  //   }
}
