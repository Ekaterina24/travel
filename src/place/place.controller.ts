import {
  Controller,
  Get,
  Post,
  Req,
  ValidationPipe,
  Query,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { Place } from './place.model';
import { PlaceService } from './place.service';
import { GetPlaceApiDto } from './dto/get-place-api.dto';
import { GetPlacesFilterDto } from './dto/get-place-filter.dto';

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
  getPlaces(): Promise<Place[]> {
    return this.placeService.getPlaces();
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
