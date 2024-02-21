import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { createMemDB } from '../utils/testing-helpers/create.memdb';
import { ServerUser } from '../server-user/server-user.model';
import { Server } from '../servers/server.model';

describe('AppController', () => {
  let authService: AuthService;
  let memDb: Sequelize;

  // beforeEach(async () => {
  //   const app: TestingModule = await Test.createTestingModule({
  //     controllers: [AuthController],
  //     providers: [AuthService],
  //   }).compile();

  //   appController = app.get<AuthController>(AuthController);
  // });

  beforeAll(async () => {
    memDb = await createMemDB([User, ServerUser, Server]);
  });

  describe('login', () => {
    it('should return a token', () => {
      return expect(
        authService.signIn({
          email: 'test@mail.com',
          password: 'testtest',
          id: 0,
          firstName: '',
          lastName: '',
          photo: '',
          isAdmin: false,
        }),
      ).toBeDefined();
    });
  });
});
