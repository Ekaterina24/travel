import {
  Controller,
  ValidationPipe,
  Post,
  Body,
  Patch,
  ParseIntPipe,
  Param,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileDto } from './dto/user-profile.dto';
import { TokenLoginDto } from './dto/token-login.dto';
import { User } from './user.model';

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
  ): Promise<TokenLoginDto> {
    return this.authService.login(authLoginDto);
  }

  @Get('/profile')
  @UseGuards(AuthGuard())
  getProfile(@Req() req): Promise<UserProfileDto> {
    return this.authService.getProfile(req.user);
  }

  @Get('/users')
  getUsers(): Promise<UserProfileDto[]> {
    return this.authService.getUsers();
  }

  @Patch('/scores')
  @UseGuards(AuthGuard())
  updateScores(
    @Req() req,
    @Body('scores') scores: number,
  ) {
    console.log("user:, ", req.user)
    this.authService.updateScores(req.user, scores);
  }

  @Patch('/email')
  updateEmail(
    @Req() req,
    @Body('email') email: string,
  ) {
    this.authService.updateEmail(req.user, email);
  }

  // @Patch('/:id')
  // // @Roles(UserRole.Moderator)
  // @UseGuards(AuthGuard())
  // updateUser(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() user: AuthRegisterDto,
  // ): Promise<UpdateUserDto> {
  //   return this.authService.updateUser(id, user);
  // }

  // @Patch('/:id/username')
  // updateUsername(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('username') username: string,
  // ): Promise<User> {
  //   return this.authService.updateUsername(id, username);
  // }

  // @Patch('/:id/email')
  // updateEmail(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('email') email: string,
  // ): Promise<User> {
  //   return this.authService.updateEmail(id, email);
  // }

}
