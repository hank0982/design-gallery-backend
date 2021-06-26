import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackUnitController } from './feedback-unit.controller';
import { FeedbackUnitService } from './feedback-unit.service';

describe('FeedbackUnitController', () => {
  let controller: FeedbackUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackUnitController],
      providers: [FeedbackUnitService],
    }).compile();

    controller = module.get<FeedbackUnitController>(FeedbackUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
