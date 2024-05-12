import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TypeSubService } from './type_sub.service';
import { CreateTypeSubDto } from './dto/create-type-sub.dto';
import { TypeSub } from './type_sub.model';

@Controller('type-sub')
export class TypeSubController {
    constructor(private typeSubService: TypeSubService) { }
    
    @Post()
    createTypeSub(
      @Body() createTypeSubDto: CreateTypeSubDto
      ) {
      return this.typeSubService.createTypeSub(createTypeSubDto);
    }

    @Get()
    getAllTypeSub(): Promise<TypeSub[]> {
      return this.typeSubService.getAllTypeSub();
  }
  
  @Get('/:id')
  getTypeSubById(
    @Param('id') id: number
  ): Promise<TypeSub> {
    return this.typeSubService.getTypeSubById(id);
  }
}

