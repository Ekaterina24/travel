import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../ormconfig';
import { AuthModule } from './auth/auth.module.js';
import { TripModule } from './trip/trip.module.js';
import { DayPlacesModule } from './day_places/day_places.module.js';
import { PlaceModule } from './place/place.module.js';
import { CityModule } from './city/city.module.js';
import { AudioModule } from './audio/audio.module.js';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TypeSubModule } from './type_sub/type_sub.module';
import { SubUserModule } from './sub_user/sub_user.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 1000, 
        limit: 2,
      },
    ]),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TripModule,
    DayPlacesModule,
    PlaceModule,
    CityModule,
    AudioModule,
    TypeSubModule,
    SubUserModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
