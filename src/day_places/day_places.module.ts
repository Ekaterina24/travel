import { Module } from '@nestjs/common';
import { DayPlacesController } from './day_places.controller';
import { DayPlacesService } from './day_places.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayPlaces } from './day-places.model';
import { AuthModule } from 'src/auth/auth.module';
import { DayPlacesRepository } from './day_places.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DayPlaces]), 
    AuthModule
  ],
  controllers: [DayPlacesController],
  providers: [DayPlacesService, DayPlacesRepository]
})
export class DayPlacesModule {}
