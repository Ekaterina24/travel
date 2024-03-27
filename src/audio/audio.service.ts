import { Injectable } from '@nestjs/common';
import { AudioRepository } from './audio.repository';
import { Audio } from './audio.model';
import { Place } from 'src/place/place.model';
import { GetPlaceAudioDto } from './dto/get-place-audio.dto';

@Injectable()
export class AudioService {
    constructor(private audioRepository: AudioRepository) { }

    insertAudio(): Promise<Audio[]> {
        return this.audioRepository.insertAudio()
    }

    getAudioListByPlace(getPlaceAudioDto: GetPlaceAudioDto): Promise<Audio[]> {
        return this.audioRepository.getAudioListByPlace(getPlaceAudioDto);
      }


}
