import { Module } from '@nestjs/common';
import { FeedbackUnitService } from './feedback-unit.service';
import { FeedbackUnitController } from './feedback-unit.controller';
import {
  FeedbackUnit,
  FeedbackUnitSchema,
} from 'src/schemas/feedback-unit.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignModule } from '../design/design.module';
import { Design, DesignSchema } from 'src/schemas/design.schema';
import { Principle, PrincipleSchema } from 'src/schemas/principle.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Principle.name, schema: PrincipleSchema },
      { name: Design.name, schema: DesignSchema },
      { name: FeedbackUnit.name, schema: FeedbackUnitSchema },
    ]),
    UserModule,
  ],
  controllers: [FeedbackUnitController],
  providers: [FeedbackUnitService],
  exports: [FeedbackUnitService, MongooseModule],
})
export class FeedbackUnitModule {}
