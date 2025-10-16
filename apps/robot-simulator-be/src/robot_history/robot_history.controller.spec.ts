import { Test, TestingModule } from '@nestjs/testing';
import { RobotHistoryController } from './robot_history.controller';
import { RobotHistoryService } from './robot_history.service';

describe('RobotHistoryController', () => {
  let controller: RobotHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RobotHistoryController],
      providers: [RobotHistoryService],
    }).compile();

    controller = module.get<RobotHistoryController>(RobotHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
