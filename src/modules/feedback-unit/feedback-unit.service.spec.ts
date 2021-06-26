import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackUnitService } from './feedback-unit.service';

describe('FeedbackUnitService', () => {
  let service: FeedbackUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackUnitService],
    }).compile();

    service = module.get<FeedbackUnitService>(FeedbackUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
