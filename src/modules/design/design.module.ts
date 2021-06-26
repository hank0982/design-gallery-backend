import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignController } from './design.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Design, DesignSchema } from 'src/schemas/design.schema';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { ProjectService } from '../project/project.service';
import {
  FeedbackUnit,
  FeedbackUnitSchema,
} from 'src/schemas/feedback-unit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeedbackUnit.name, schema: FeedbackUnitSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Design.name, schema: DesignSchema },
    ]),
  ],
  controllers: [DesignController],
  providers: [DesignService, ProjectService],
})
export class DesignModule {}
