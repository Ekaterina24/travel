import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TripRepository } from './trip.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trip.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]), 
    AuthModule
  ],
  controllers: [TripController],
  providers: [TripService, TripRepository]
})
export class TripModule {}
