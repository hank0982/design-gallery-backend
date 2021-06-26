import { Module } from '@nestjs/common';
import { FeedbackUnitService } from './feedback-unit.service';
import { FeedbackUnitController } from './feedback-unit.controller';
import {
  FeedbackUnit,
  FeedbackUnitSchema,
} from 'src/schemas/feedback-unit.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeedbackUnit.name, schema: FeedbackUnitSchema },
    ]),
  ],
  controllers: [FeedbackUnitController],
  providers: [FeedbackUnitService],
})
export class FeedbackUnitModule {}
