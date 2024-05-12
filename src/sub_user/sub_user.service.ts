import { Injectable } from '@nestjs/common';
import { SubUser } from './sub_user.model';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { User } from 'src/auth/user.model';
import { SubUserRepository } from './sub_user.repository';

@Injectable()
export class SubUserService {
  constructor(private subscribeRepository: SubUserRepository) {}

  createSubscribe(createSubscribeDto: CreateSubscribeDto, user: User) {
    return this.subscribeRepository.createSubscribe(createSubscribeDto, user);
  }

  getSubscribesByUser(user: User): Promise<SubUser[]> {
    return this.subscribeRepository.getSubscribesByUser(user);
  }
}
