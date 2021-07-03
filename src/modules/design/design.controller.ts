import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  NotFoundException,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
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
    FilesInterceptor('files', undefined, {
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
  uploadFile(@Req() req, @UploadedFiles() files: Express.Multer.File[]) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!files || files.length == 0) {
      throw new BadRequestException('Invalid files');
    }
    const hostname = req.headers.host;
    const response = { imageUrls: {} };
    files.forEach(
      (file) =>
        (response.imageUrls[
          file.originalname
        ] = `${hostname}/uploads/${file.filename}`),
    );
    return response;
  }
}
