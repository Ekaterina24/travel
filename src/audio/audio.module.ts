import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audio } from './audio.model';
import { AudioRepository } from './audio.repository';
import { PlaceRepository } from 'src/place/place.repository';
import { PlaceModule } from 'src/place/place.module';

@Module({
  imports: [TypeOrmModule.forFeature([Audio]), PlaceModule],
  controllers: [AudioController],
  providers: [AudioService, AudioRepository, PlaceRepository]
})
export class AudioModule {}
