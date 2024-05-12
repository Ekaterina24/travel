import { Module } from '@nestjs/common';
import { SubUserController } from './sub_user.controller';
import { SubUserService } from './sub_user.service';
import { SubUserRepository } from './sub_user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubUser } from './sub_user.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubUser]), 
    AuthModule
  ],
  controllers: [SubUserController],
  providers: [SubUserService, SubUserRepository]
})
export class SubUserModule {}
