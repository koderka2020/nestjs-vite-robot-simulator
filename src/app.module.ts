import { Module } from '@nestjs/common';
import { RobotHistoryModule } from './robot_history/robot_history.module';

@Module({
  imports: [RobotHistoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
