import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';
import { DayPlacesModule } from './day_places/day_places.module';
import { PlaceModule } from './place/place.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TripModule,
    DayPlacesModule,
    PlaceModule,
    CityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
