import { Module } from '@nestjs/common';
import { RobotHistoryService } from './robot_history.service';
import { RobotHistoryController } from './robot_history.controller';

@Module({
  controllers: [RobotHistoryController],
  providers: [RobotHistoryService],
})
export class RobotHistoryModule {}
