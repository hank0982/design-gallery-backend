import { Test, TestingModule } from '@nestjs/testing';
import { IterationService } from './iteration.service';

describe('IterationService', () => {
  let service: IterationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IterationService],
    }).compile();

    service = module.get<IterationService>(IterationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
