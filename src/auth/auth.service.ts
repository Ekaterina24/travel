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
import { TokenLoginDto } from './dto/token-login.dto';
import { UpdateScoresDto } from './dto/update-scores.dto';

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

  async login(authLoginDto: AuthLoginDto): Promise<TokenLoginDto> {
    const username =
      await this.userRepository.validateUserPassword(authLoginDto);

    if (!username) {
      throw new UnauthorizedException('Неверный email или пароль.');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Сгенерированный JWT токен: ${JSON.stringify(payload)}`);

    const tokenDto = new TokenLoginDto(accessToken, 24 * 60 * 60 * 1000)
    return tokenDto;
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
    newDto.id = user.id;
    newDto.username = user.username;
    newDto.email = user.email;
    newDto.scores = user.scores;
    return newDto;
  }

  getUsers(): Promise<UserProfileDto[]> {
    return this.userRepository.getUsers();
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

  async updateUsername(id: number, username: string): Promise<User> {
    const updateUser = await this.getUserById(id);
    updateUser.username = username;
    
    // this.login(new AuthLoginDto(updateUser.email, updateUser.password))
    await updateUser.save();
    return updateUser;
  }

  async updateEmail(id: number, email: string): Promise<User> {
    const updateUser = await this.getUserById(id);
    updateUser.email = email;
    await updateUser.save();
    return updateUser;
  }

  async updateScores(user: User, scores: number) {
    const updateUser = await this.getUserById(user.id);
    updateUser.scores = scores;
    console.log("updateUser: ", updateUser)
    await updateUser.save();
   
  }
}
