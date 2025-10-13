import { Test, TestingModule } from '@nestjs/testing';
import { RobotHistoryService } from './robot_history.service';

describe('RobotHistoryService', () => {
  let service: RobotHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RobotHistoryService],
    }).compile();

    service = module.get<RobotHistoryService>(RobotHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
