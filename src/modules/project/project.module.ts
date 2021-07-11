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
import { UserModule } from '../user/user.module';
import { Rating, RatingSchema } from 'src/schemas/rating.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rating.name, schema: RatingSchema },
      { name: Design.name, schema: DesignSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: FeedbackUnit.name, schema: FeedbackUnitSchema },
    ]),
    UserModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService, MongooseModule],
})
export class ProjectModule {}
