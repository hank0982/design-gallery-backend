import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { isValidObjectId } from 'mongoose';

@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }


  @Get('id/:id')
  async findOneById(@Param('id') id: string) {
    return await this.userService.findOneById(id);
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    return await this.userService.findOneByUsername(username);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  @Get(':id/rated-projects')
  async findRatedProjects(@Param('id') id: string) {
    if (isValidObjectId(id)) {
      return await this.userService.findRatedProjects(id);
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
