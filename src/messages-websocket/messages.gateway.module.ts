import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { ServersModule } from '../servers/servers.module';
import { ServersService } from '../servers/servers.service';

@Module({
  imports: [UsersModule, ServersModule],
  providers: [MessagesGateway, UsersService, ServersService],
})
export class MessagesGatewayModule {}
