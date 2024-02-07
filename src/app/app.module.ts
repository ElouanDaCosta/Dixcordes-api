import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { MessagesGatewayModule } from '../messages-websocket/messages.gateway.module';
import { ServersModule } from '../servers/servers.module';
import { AuthGuard } from '../auth/auth.guard';
import { ServerUser } from '../server-user/server-user.model';
import { Server } from '../servers/server.model';
import * as config from '../../config/config.json';

const DbDevConfig = config.development;
@Module({
  imports: [
    SequelizeModule.forRoot({
      ...DbDevConfig,
      dialect: 'postgres',
      models: [User, Server, ServerUser],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    MessagesGatewayModule,
    ServersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
