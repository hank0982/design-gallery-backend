import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  NotFoundException,
  Req,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { promises as fs } from 'fs';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { isValidObjectId } from 'mongoose';
import * as multer from 'multer';
import * as path from 'path';
import { ErrorMessage } from 'src/error-messages/error-message.en';
import { ProjectService } from '../project/project.service';
import { DesignService } from './design.service';
import { CreateDesignDto } from './dtos/create-design.dto';
import { UpdateDesignDto } from './dtos/update-design.dto';
import { v4 as uuidv4 } from 'uuid';
import * as imageThumbnail from 'image-thumbnail';

@ApiTags('Designs')
@Controller('api/designs')
export class DesignController {
  constructor(
    private readonly designService: DesignService,
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  async create(@Body() createDesignDto: CreateDesignDto) {
    const response = await this.designService.create(createDesignDto);
    await this.projectService.addDesignToProject(
      response.projectId,
      response._id,
    );
    return response;
  }

  @Get()
  async findAll() {
    try {
      return await this.designService.findAll();
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (isValidObjectId(id)) {
      return await this.designService.findOne(id);
    } else {
      throw new NotFoundException(ErrorMessage.ObjectIdNotValid);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDesignDto: UpdateDesignDto,
  ) {
    return await this.designService.update(id, updateDesignDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.designService.remove(id);
  }

  @Delete()
  async removeAll() {
    return await this.designService.removeAll();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: (_req, _file, cb) =>
          cb(null, path.resolve('.', 'client', 'uploads')),
        filename(_req, file, cb) {
          cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const acceptedFileTypesRegex = /jpeg|jpg|png|gif/;
        const mimetype = acceptedFileTypesRegex.test(file.mimetype);
        const extname = acceptedFileTypesRegex.test(
          path.extname(file.originalname),
        );
        if (mimetype && extname) {
          return cb(null, true);
        }
        req.fileValidationError = ErrorMessage.FileTypeNotSupported;
        return cb(null, false);
      },
    }),
  )
  async uploadFile(@Req() req, @UploadedFile() file: Express.Multer.File) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('Invalid files');
    }
    const hostname = req.headers.host;
    try {
      const thumbnail = await imageThumbnail(path.resolve('.', 'client', 'uploads', file.filename));
      const thumbnailPath = path.resolve('.', 'client', 'thumbnails', file.filename);
      await fs.writeFile(thumbnailPath, thumbnail).catch((err) => {
        if (err) return console.log(err);
      });
    } catch (err) {
        console.error(err);
    }
    return await this.designService.saveImage(file.filename, file.originalname, file.size, hostname);
  }
}
