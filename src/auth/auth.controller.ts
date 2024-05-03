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
import { Roles } from './roles.decorator';
import { UserRole } from './user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileDto } from './dto/user-profile.dto';

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

  @Get('/profile')
  @UseGuards(AuthGuard())
  getProfile(@Req() req): Promise<UserProfileDto> {
    return this.authService.getProfile(req.user);
  }

  @Patch('/:id')
  // @Roles(UserRole.Moderator)
  @UseGuards(AuthGuard())
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: AuthRegisterDto,
  ): Promise<UpdateUserDto> {
    return this.authService.updateUser(id, user);
  }
}
