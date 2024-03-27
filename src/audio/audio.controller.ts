import { Body, Controller, Get, Post } from '@nestjs/common';
import { AudioService } from './audio.service';
import { Audio } from './audio.model';
import { GetPlaceAudioDto } from './dto/get-place-audio.dto';

@Controller('audio')
export class AudioController {
    constructor(private audioService: AudioService) {}
    
    @Post()
    insertAudio(): Promise<Audio[]> {
      return this.audioService.insertAudio();
  }
  
  @Get()
  getAudioListByPlace(
      @Body() getPlaceAudioDto: GetPlaceAudioDto,
    ): Promise<Audio[]> {
      return this.audioService.getAudioListByPlace(getPlaceAudioDto);
  }
  
}
