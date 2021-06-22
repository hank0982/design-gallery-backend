import { Module } from '@nestjs/common';
import { IterationService } from './iteration.service';
import { IterationController } from './iteration.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Iteration, IterationSchema } from 'src/schemas/iteration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Iteration.name, schema: IterationSchema },
    ]),
  ],
  controllers: [IterationController],
  providers: [IterationService],
})
export class IterationModule {}
