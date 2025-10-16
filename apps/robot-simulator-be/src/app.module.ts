import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RobotHistoryModule } from './robot_history/robot_history.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    RobotHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
