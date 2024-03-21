import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city.model';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityRepository } from './city.repository';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService, CityRepository],
})
export class CityModule {}
