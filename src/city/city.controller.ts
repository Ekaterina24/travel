import { Body, Controller, Post, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './city.model';

@Controller('city')
export class CityController {
    constructor(private cityService: CityService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createCity(
      @Body() createCityDto: CreateCityDto
      ): Promise<City> {
      return this.cityService.createCity(createCityDto);
    }

    @Get()
    getCityList(): Promise<City[]> {
      return this.cityService.getCityList();
    }
}
