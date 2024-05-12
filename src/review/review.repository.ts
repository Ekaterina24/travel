import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Review } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from 'src/auth/user.model';

@Injectable()
export class ReviewRepository extends Repository<Review> {
  constructor(dataSource: DataSource) {
    super(Review, dataSource.createEntityManager());
  }

  async createReview(createReviewDto: CreateReviewDto, user: User) {
    const { placeId, text, rating } = createReviewDto;

    const review = new Review();
    review.userId = user.id;
    review.placeId = placeId;
    review.text = text;
    review.rating = rating;
    review.date = new Date();

    try {
      await review.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getReviewsByUser(user: User): Promise<Review[]> {
    const query = this.createQueryBuilder('review');

    query.where('review.userId = :userId', { userId: user.id });

    try {
      const reviews = await query.getMany();
      return reviews;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getReviewsByPlaceId(id: string): Promise<Review[]> {
    const found = await this.find({
      where: {
        placeId: id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Тип подписки с ID ${id} не найден.`);
    }
    return found;
  }
}
