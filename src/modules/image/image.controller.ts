import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('api/images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async findAll() {
    return await this.imageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.imageService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return await this.imageService.update(id, updateImageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.imageService.remove(id);
  }

  @Delete()
  async removeAll() {
    return await this.imageService.removeAll();
  }

}
