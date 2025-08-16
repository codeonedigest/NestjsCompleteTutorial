import { Test, TestingModule } from '@nestjs/testing';
import { CodcircuitbreakerController } from './codcircuitbreaker.controller';

describe('CodcircuitbreakerController', () => {
  let controller: CodcircuitbreakerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodcircuitbreakerController],
    }).compile();

    controller = module.get<CodcircuitbreakerController>(CodcircuitbreakerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
