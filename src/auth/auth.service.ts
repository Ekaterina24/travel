import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(authRegisterDto: AuthRegisterDto): Promise<void> {
    await this.userRepository.register(authRegisterDto);
  }

  async login(authLoginDto: AuthLoginDto): Promise<{ accessToken: string }> {
    const username =
      await this.userRepository.validateUserPassword(authLoginDto);

    if (!username) {
      throw new UnauthorizedException('Неверный email или пароль.');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Сгенерированный JWT токен: ${JSON.stringify(payload)}`);

    return { accessToken };
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден.`);
    }
    return found;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async getProfile(
    user: User
  ): Promise<UserProfileDto> {
    const newDto = new UserProfileDto();
    newDto.username = user.username;
    newDto.email = user.email;
    newDto.scores = user.scores;
    return newDto;
  }

  async updateUser(
    id: number,
    newUser: AuthRegisterDto,
  ): Promise<UpdateUserDto> {
      await this.userRepository.update(id, newUser); 
      const user = await this.getUserById(id);
      user.password = await this.hashPassword(user.password, user.salt);
      user.save()
    const newDto = new UpdateUserDto();
    newDto.username = user.username;
    newDto.email = user.email;
    return newDto;
  }

  
}
