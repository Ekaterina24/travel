import {
  Controller,
  Get,
  Post,
  ValidationPipe,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { Place } from './place.model';
import { PlaceService } from './place.service';
import { GetPlacesFilterDto } from './dto/get-place-filter.dto';
import { GetPlaceByCityFilterDto } from './dto/get-place-by-city-filter.dto';

@Controller('place')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  // @Post() Admin
  // @UsePipes(ValidationPipe)
  // createTrip(
  //   @Body() createTripDto: CreateTripDto,
  //   @Req() req
  //   ): Promise<CreateTripDto> {
  //   return this.tripService.createTrip(createTripDto, req.user);
  // }

  @Get()
  getPlaces(
    @Query(ValidationPipe) dto: GetPlaceByCityFilterDto
  ): Promise<Place[]> {
    return this.placeService.getPlaces(dto);
  }

  @Post()
  insertDataFromApi(
      @Query(ValidationPipe) filterDto: GetPlacesFilterDto, 
  ): Promise<Place[]> {
    return this.placeService.insertDataFromApi(filterDto);
  }

  @Patch()
  // @Roles(UserRole.Moderator)
  updateUser(
    @Query(ValidationPipe) filterDto: GetPlacesFilterDto,
  ): Promise<boolean> {
    return this.placeService.updateDataFromApi(filterDto);
    }

    @Get('/:id')
    getPlaceById(
      @Param('id') id: string
    ): Promise<Place> {
      return this.placeService.getPlaceById(id);
    }
    

//     @Patch('/:id/date')
//   updateTaskStatus(
//     @Param('id') id: string,
//     @Body('date') date: string,
//     // @Req() req
//     ): Promise<Place> {
//     return this.placeService.updatePlaceDate(id, date);
//     }
    
//     @Get('date')
//     getPlacesByDay(@Body('date') date: string): Promise<Place[]> {
//         return this.placeService.getPlacesByDay(date)

//     }
}