import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ImageSchema, Image } from 'src/schemas/image.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Image.name, schema: ImageSchema }
    ]),
  ],
  controllers: [ImageController],
  providers: [ImageService]
})
export class ImageModule {}
