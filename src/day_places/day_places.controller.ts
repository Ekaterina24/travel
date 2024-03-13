import { Body, Controller, Post } from '@nestjs/common';
import { DayPlacesService } from './day_places.service';
import { DayPlacesDto } from './dto/day-places.dto';
import { DayPlaces } from './day-places.model';

@Controller('day-places')
export class DayPlacesController {
    constructor(private dayPlacesService: DayPlacesService) {}

    @Post()
    addPlaceToDay(
        @Body() dto: DayPlacesDto
    ): Promise<DayPlaces> {
        return this.dayPlacesService.addPlaceToDay(dto)
    }

    
}
