import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignController } from './design.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Design, DesignSchema } from 'src/schemas/design.schema';
import { ProjectService } from '../project/project.service';
import { ProjectModule } from '../project/project.module';
import { FeedbackUnitModule } from '../feedback-unit/feedback-unit.module';
import { Image, ImageSchema } from 'src/schemas/image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Design.name, schema: DesignSchema },
      { name: Image.name, schema: ImageSchema }
    ]),
    ProjectModule,
    FeedbackUnitModule,
  ],
  controllers: [DesignController],
  providers: [DesignService, ProjectService],
  exports: [MongooseModule],
})
export class DesignModule {}
