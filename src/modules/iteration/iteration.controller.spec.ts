import { Test, TestingModule } from '@nestjs/testing';
import { IterationController } from './iteration.controller';
import { IterationService } from './iteration.service';

describe('IterationController', () => {
  let controller: IterationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IterationController],
      providers: [IterationService],
    }).compile();

    controller = module.get<IterationController>(IterationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
