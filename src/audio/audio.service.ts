import { Injectable } from '@nestjs/common';
import { AudioRepository } from './audio.repository';
import { Audio } from './audio.model';

@Injectable()
export class AudioService {
    constructor(private audioRepository: AudioRepository) { }

    insertAudio(): Promise<Audio[]> {
        return this.audioRepository.insertAudio()
    }

    getAudioListByPlace(placeId: string): Promise<Audio[]> {
        return this.audioRepository.getAudioListByPlace(placeId);
    }
    
    getAudioList(): Promise<Audio[]> {
        return this.audioRepository.getAudioList();
    }
    
    // getAudioByPlace(): Promise<Audio[]> {
    //     return this.audioRepository.getAudioByPlace();
    //   }


}
