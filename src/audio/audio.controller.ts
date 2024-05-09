import { Controller, Get, Param, Post } from '@nestjs/common';
import { AudioService } from './audio.service';
import { Audio } from './audio.model';

@Controller('audio')
export class AudioController {
    constructor(private audioService: AudioService) {}
    
    @Post()
    insertAudio(): Promise<Audio[]> {
      return this.audioService.insertAudio();
  }
  
  // @Get()
  // getAudioListByPlace(
  //     @Body() getPlaceAudioDto: GetPlaceAudioDto,
  //   ): Promise<Audio[]> {
  //     return this.audioService.getAudioListByPlace(getPlaceAudioDto);
  // }

  @Get('/:id')
  getAudioListByPlace(
    @Param('id') placeId: string
    ): Promise<Audio[]> {
      return this.audioService.getAudioListByPlace(placeId);
  }

  @Get()
  getAudioList(): Promise<Audio[]> {
      return this.audioService.getAudioList();
  }

  // @Get()
  // getAudioByPlace(): Promise<Audio[]> {
  //     return this.audioService.getAudioByPlace();
  // }
  
  
}
