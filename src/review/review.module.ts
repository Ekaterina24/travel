import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Review]), 
    AuthModule
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository]
})
export class ReviewModule {}
