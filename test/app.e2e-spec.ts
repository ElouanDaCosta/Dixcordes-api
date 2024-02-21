import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { AuthModule } from '../src/auth/auth.module';
import { MessagesGatewayModule } from '../src/messages-websocket/messages.gateway.module';
import { ServersModule } from '../src/servers/servers.module';
import { UsersModule } from '../src/users/users.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        UsersModule,
        AuthModule,
        ServersModule,
        MessagesGatewayModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: 'test',
        lastName: 'testing',
        email: 'test@mail.com',
        password: 'testtest',
      })
      .expect(201);
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@mail.com',
        password: 'testtest',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.access_token).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
