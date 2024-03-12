import { Controller, Post, UsePipes, ValidationPipe, Body, Req, UseGuards, Get, Query } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { AuthGuard } from '@nestjs/passport';
import { Trip } from './trip.model';

@Controller('trip')
@UseGuards(AuthGuard())
export class TripController {
    constructor(private tripService: TripService) {}
    
    @Post()
    @UsePipes(ValidationPipe)
    createTrip(
      @Body() createTripDto: CreateTripDto,
      @Req() req
      ): Promise<CreateTripDto> {
      return this.tripService.createTrip(createTripDto, req.user);
    }

    @Get()
    getTrips(
      @Req() req,
    ): Promise<Trip[]> {
      return this.tripService.getTrips(req.user);
    }
}
