import { UnauthorizedException } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ServersService } from '../servers/servers.service';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*',
  },
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  socket: Socket;
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private serverService: ServersService,
  ) {}

  afterInit(server: Server) {
    console.log('[WS] Messages gateway initialized.');
    server.use((socket, next) => {
      if (socket.handshake.headers.authorization) {
        next();
      } else {
        next(new UnauthorizedException());
      }
    });
  }

  async handleConnection(socket: Socket) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(
        socket.handshake.headers.authorization,
      );
      const user = await this.usersService.findOne(decodedToken.sub);
      if (!user) {
        console.log('User not found');
        socket.disconnect();
      } else {
        console.log('Connected. socket: ', socket.id);
      }
    } catch {
      console.log(new UnauthorizedException());
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    socket.disconnect();
    console.log('Disconnected');
  }

  // @SubscribeMessage('serverMessage')
  // async sendMessage(
  //   @MessageBody()
  //   data: {
  //     serverId: number;
  //     userId: number;
  //     message: string;
  //     roomId: number;
  //   },
  // ) {
  //   const roomId = data.roomId || 0;
  //   const server = await this.serverService.getServer(data.serverId);
  //   if (
  //     data.serverId === undefined ||
  //     data.userId === undefined ||
  //     data.message === undefined
  //   )
  //     return;
  //   else if (this.serverService.getOneMember(data.serverId, data.userId)) {
  //     // this.socket.to(server.).emit('serverMessage', {
  //     //   message: data.message,
  //     //   user: data.userId,
  //     // });
  //     // this.server.emit(`serverMessage_${server.uuid}`, {
  //     //   message: data.message,
  //     //   user: data.userId,
  //     // });
  //   } else {
  //     console.log('User not found in the server');
  //   }
  // }

  @SubscribeMessage('message')
  onMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    this.server.emit('message', {
      message: 'New message',
      content: data,
      from: client.id,
    });
    return data;
  }
}
