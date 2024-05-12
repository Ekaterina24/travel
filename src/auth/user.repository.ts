import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UserRole } from './user-role.enum';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUsers(): Promise<UserProfileDto[]> {
    const query = this.createQueryBuilder('users');

    try {
      const users = await query.getMany();
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async register(authRegisterDto: AuthRegisterDto): Promise<void> {
    const { username, email, password } = authRegisterDto;

    const user = new User();
    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.role = UserRole.User;
    user.scores = 0;

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        // duplicate username, email
        // throw new ConflictException('Такие username и email уже существуют.');
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: ['Такие username и email уже существуют.'],
          error: 'Conflict',
        });
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateUserPassword(authLoginDto: AuthLoginDto): Promise<string> {
    const { email, password } = authLoginDto;
    const user = await this.findOne({ where: { email: email } });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
}
