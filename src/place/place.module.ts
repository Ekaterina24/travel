import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Place } from './place.model';
import { PlaceRepository } from './place.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]), 
    AuthModule
  ],
  controllers: [PlaceController],
  providers: [PlaceService, PlaceRepository],
  exports: [
    PlaceRepository
  ]
})
export class PlaceModule {}
