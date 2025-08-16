import { Test, TestingModule } from '@nestjs/testing';
import { CodcircuitbreakerService } from './codcircuitbreaker.service';

describe('CodcircuitbreakerService', () => {
  let service: CodcircuitbreakerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodcircuitbreakerService],
    }).compile();

    service = module.get<CodcircuitbreakerService>(CodcircuitbreakerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
