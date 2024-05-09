import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './trip.model';
import { TripService } from './trip.service';

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
    getTripsByUser(
      @Req() req,
    ): Promise<Trip[]> {
      return this.tripService.getTripsByUser(req.user);
    }
}
