import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { SubUserService } from './sub_user.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { SubUser } from './sub_user.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('subscribe')
@UseGuards(AuthGuard())
export class SubUserController {
  constructor(private subUserService: SubUserService) {}

  @Post()
  createSubscribe(@Body() createSubscribeDto: CreateSubscribeDto, @Req() req) {
    return this.subUserService.createSubscribe(createSubscribeDto, req.user);
  }

  @Get()
  getSubscribesByUser(@Req() req): Promise<SubUser[]> {
    return this.subUserService.getSubscribesByUser(req.user);
  }

  // @Get('/:id')
  // getPlaceById(
  //   @Param('id') id: number
  // ): Promise<SubUser> {
  //   return this.subUserService.getPlaceById(id);
  // }
}
