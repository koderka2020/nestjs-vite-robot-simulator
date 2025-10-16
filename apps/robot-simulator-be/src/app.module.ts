import { Module } from '@nestjs/common';
import { RobotHistoryModule } from './robot_history/robot_history.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, RobotHistoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
