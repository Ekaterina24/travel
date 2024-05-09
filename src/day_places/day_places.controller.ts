import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { DayPlacesService } from './day_places.service';
import { DayPlacesDto } from './dto/day-places.dto';
import { DayPlaces } from './day-places.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('day-places')
@UseGuards(AuthGuard())
export class DayPlacesController {
    constructor(private dayPlacesService: DayPlacesService) {}

    @Post()
    addPlaceToDay(
        @Body() dto: DayPlacesDto
    ): Promise<DayPlaces> {
        return this.dayPlacesService.addPlaceToDay(dto)
    }

    @Get()
    getDayPlacesByUser(
      @Req() req,
      @Query('date') date: string
    ): Promise<DayPlaces[]> {
      return this.dayPlacesService.getDayPlacesByUser(req.user, date);
    }


    
}
