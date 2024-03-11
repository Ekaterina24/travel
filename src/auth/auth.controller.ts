import { Controller, ValidationPipe, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './auth-register.dto';
import { AuthLoginDto } from './auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(
    @Body(ValidationPipe) authRegisterDto: AuthRegisterDto,
  ): Promise<void> {
    return this.authService.register(authRegisterDto);
  }

  @Post('/login')
  login(
    @Body(ValidationPipe) authLoginDto: AuthLoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(authLoginDto);
  }
}
