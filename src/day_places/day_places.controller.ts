import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { DayPlacesService } from './day_places.service';
import { DayPlacesDto } from './dto/day-places.dto';
import { DayPlaces } from './day-places.model';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

@Controller('day-places')
@UseGuards(AuthGuard())
export class DayPlacesController {
    constructor(private dayPlacesService: DayPlacesService) {}

    @Post()
    addPlaceToDay(
      @Req() req,
        @Body() dto: DayPlacesDto
    ): Promise<DayPlaces> {
        return this.dayPlacesService.addPlaceToDay(req.user, dto)
    }

    @Get()
    getDayPlacesByUser(
      @Req() req,
      @Query('date') date: string
    ): Promise<DayPlaces[]> {
      return this.dayPlacesService.getDayPlacesByUser(req.user, date);
    }


    @Delete('/:id')
    deletePlaceById(
      @Req() req,
      @Param('id') id: string
    ): Promise<DeleteResult> {
      return this.dayPlacesService.deletePlaceByRecordId(req.user, id);
    }
}
