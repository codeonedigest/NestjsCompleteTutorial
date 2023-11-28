import { Test, TestingModule } from '@nestjs/testing';
import { CatsControllerController } from './cats-controller.controller';

describe('CatsControllerController', () => {
  let controller: CatsControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsControllerController],
    }).compile();

    controller = module.get<CatsControllerController>(CatsControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
