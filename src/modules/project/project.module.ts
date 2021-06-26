import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Design, DesignSchema } from 'src/schemas/design.schema';
import {
  FeedbackUnit,
  FeedbackUnitSchema,
} from 'src/schemas/feedback-unit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Design.name, schema: DesignSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: FeedbackUnit.name, schema: FeedbackUnitSchema },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
