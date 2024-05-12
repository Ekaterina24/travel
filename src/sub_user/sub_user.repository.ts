import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SubUser } from './sub_user.model';
import { User } from 'src/auth/user.model';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';

@Injectable()
export class SubUserRepository extends Repository<SubUser> {
  constructor(dataSource: DataSource) {
    super(SubUser, dataSource.createEntityManager());
  }

  async createSubscribe(createSubscribeDto: CreateSubscribeDto, user: User) {
    const { typeId, city } = createSubscribeDto;

    const subscribe = new SubUser();
    subscribe.typeId = typeId;
    subscribe.city = city;
    subscribe.userId = user.id;
    subscribe.date = new Date();

    try {
      await subscribe.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getSubscribesByUser(user: User): Promise<SubUser[]> {
    const query = this.createQueryBuilder('sub-user');

    query.where('sub-user.userId = :userId', { userId: user.id });

    try {
      const subscribes = await query.getMany();
      return subscribes;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
