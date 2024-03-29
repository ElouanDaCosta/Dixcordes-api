import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from 'src/features/users/dto/user.dto';
import { UsersService } from 'src/features/users/users.service';
import { User } from 'src/features/users/user.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesServices } from 'src/utils/files/files-utils.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private filesServices: FilesServices,
  ) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get(':email')
  findOneByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = FilesServices.uploadFilesPath('user');
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueFileName = FilesServices.generateUniqueFileName(
            file.originalname,
          );
          callback(null, `${uniqueFileName}`);
        },
      }),
    }),
  )
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Body() userDto: UserDto,
    @Request() req,
  ): Promise<User> {
    return this.usersService.update(id, userDto, file, req.user.sub);
  }
}
