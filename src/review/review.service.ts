import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRepository } from './review.repository';
import { User } from 'src/auth/user.model';
import { Review } from './review.model';

@Injectable()
export class ReviewService {

    constructor(private reviewRepository: ReviewRepository) {}

    createReview(createReviewDto: CreateReviewDto, user: User) {
      return this.reviewRepository.createReview(createReviewDto, user);
    }

    getReviewsByUser(user: User): Promise<Review[]> {
      return this.reviewRepository.getReviewsByUser(user);
    }

    getReviewsByPlaceId(id: string): Promise<Review[]> {
      return this.reviewRepository.getReviewsByPlaceId(id);
    }

}
