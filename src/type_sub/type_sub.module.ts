import { Module } from '@nestjs/common';
import { TypeSubController } from './type_sub.controller';
import { TypeSubService } from './type_sub.service';
import { TypeSubRepository } from './type_sub.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeSub } from './type_sub.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeSub]), 
  ],
  controllers: [TypeSubController],
  providers: [TypeSubService, TypeSubRepository]
})
export class TypeSubModule {}
