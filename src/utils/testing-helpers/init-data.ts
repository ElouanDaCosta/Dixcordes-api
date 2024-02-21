import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppService } from '../../app/app.service';
import { UsersService } from '../../users/users.service';
import { ServersService } from '../../servers/servers.service';
import { AuthService } from '../../auth/auth.service';
import { UserDto } from '../../users/dto/user.dto';

export default function initData(app: NestFastifyApplication) {
  const appService = app.get(AppService);
  const usersService = app.get(UsersService);
  const serverService = app.get(ServersService);
  const authService = app.get(AuthService);
}
