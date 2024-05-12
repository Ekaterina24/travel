import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthGuard())
  createReview(@Body() createReviewDto: CreateReviewDto, @Req() req) {
    return this.reviewService.createReview(createReviewDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard())
  getReviewsByUser(@Req() req): Promise<Review[]> {
    return this.reviewService.getReviewsByUser(req.user);
  }

  @Get('/:id')
  getReviewsByPlaceId(@Param('id') id: string): Promise<Review[]> {
    return this.reviewService.getReviewsByPlaceId(id);
  }
}
