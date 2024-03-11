import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto } from './auth-register.dto';
import { AuthLoginDto } from './auth-login.dto';
import { JwtPayload } from './jwt-payload.interface';

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
  
    async login(
      authLoginDto: AuthLoginDto,
    ): Promise<{ accessToken: string }> {
      const username =
        await this.userRepository.validateUserPassword(authLoginDto);
  
      if (!username) {
        throw new UnauthorizedException('Неверный email или пароль.');
      }
  
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      this.logger.debug(
        `Сгенерированный JWT токен: ${JSON.stringify(payload)}`,
      );
  
      return { accessToken };
    }
}
