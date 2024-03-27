import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DataSource, Long, Repository } from 'typeorm';
import { Audio, AudioStatus } from './audio.model';
import * as fs from 'fs';
import { Place } from 'src/place/place.model';
import { PlaceRepository } from 'src/place/place.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetPlaceAudioDto } from './dto/get-place-audio.dto';

@Injectable()
export class AudioRepository extends Repository<Audio> {
  private logger = new Logger('AudioRepository');
  constructor(
    @InjectRepository(PlaceRepository)
    private placeRepository: PlaceRepository,
    dataSource: DataSource,
  ) {
    super(Audio, dataSource.createEntityManager());
  }

  private url =
    'C:/Users/katry/Desktop/Study/vkr/travel/src/audio/data/articles_data.json';

  readJSON(filePath: string): Audio[] {
    let parsedJsonData;
    const data = fs.readFileSync(filePath, 'utf8');
    parsedJsonData = JSON.parse(data.toString());

    return parsedJsonData;
  }

  async insertAudio(): Promise<Audio[]> {
    const data = this.readJSON(this.url);

    let places = await this.placeRepository.createQueryBuilder('place').getMany();
    console.log(`places: ${places}`);

    const items = data.map((el) => {
      const audio = new Audio();
      audio.name = el.name;
      audio.desc = el.desc;
      audio.status = AudioStatus.CLOSE;
        places.forEach((place) => {
            if (place.name == el.name) {
                audio.placeId = place.id;
            }
        })

      try {
        audio.save();
      } catch (error) {}

      return audio;
    });
    console.log(items);
    return items;
  }

  async getAudioListByPlace(
    placeId: string
  ): Promise<Audio[]> {
    const query = this.createQueryBuilder('audio');

   query.where('audio.placeId = :placeId', {placeId: placeId});

    try {
      const audioList = await query.getMany();
      return audioList; 
    } catch (error) {
      throw new InternalServerErrorException();
    }
    
  }

  async getAudioList(): Promise<Audio[]> {
    const query = this.createQueryBuilder('audio');

    try {
      const audioList = await query.getMany();
      return audioList; 
    } catch (error) {
      throw new InternalServerErrorException();
    }
    
  }

  // async getAudioByPlace(): Promise<Audio[]> {
  //   const query = this.createQueryBuilder('audio')
  //     .leftJoinAndSelect('audio.place', 'place')
  //     // .select([
  //     //   'day_places.placeId',
  //     //   'day_places.dateVisiting',
  //     //   'day_places.id',
  //     // ])
  //     .where('audio.place = place.id')

  //   try {
  //     const audioByPlace = await query.getMany();
  //     return audioByPlace
  //   } catch (error) {
  //     throw new InternalServerErrorException();
  //   }
  // }
}
