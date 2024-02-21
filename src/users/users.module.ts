import { Module } from '@nestjs/common';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FilesServices } from '../utils/files/files-utils.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [
    UsersService,
    JwtService,
    ConfigService,
    FilesServices,
    {
      provide: getModelToken(User),
      useValue: User,
    },
  ],
  controllers: [UsersController],
  exports: [SequelizeModule],
})
export class UsersModule {}
