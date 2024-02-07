import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AppController', () => {
  let appController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    appController = app.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return a token', () => {
      return expect(
        appController.signIn({
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
