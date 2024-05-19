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
import { GetCategoryDto } from './dto/get-category.dto';

@Controller('place')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @Get()
  getPlaces(
    @Query(ValidationPipe) dto: GetPlaceByCityFilterDto
  ): Promise<Place[]> {
    return this.placeService.getPlaces(dto);
  }

  @Get('category')
  getCategoryList(): Promise<GetCategoryDto[]> {
    return this.placeService.getCategoryList();
  }

  @Post()
  insertDataFromApi(
      @Query(ValidationPipe) filterDto: GetPlacesFilterDto, 
  ): Promise<void> {
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
