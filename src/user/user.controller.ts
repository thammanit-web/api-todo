import { Controller, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { UpdateUserDto } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('upload_avatar', {
      storage: diskStorage({
        destination: './uploads/avatars', 
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + extname(file.originalname); 
          callback(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
  )
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createUserDto.upload_avatar = file.filename; 
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('upload_avatar', {
      storage: diskStorage({
        destination: './uploads/avatars', 
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + extname(file.originalname); 
          callback(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
  )
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateUserDto.upload_avatar = file.filename; 
    }
    return this.usersService.update(id, updateUserDto);
  }
  
  

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.usersService.remove(id);
    await this.usersService.resetAutoIncrement();
  }
}
