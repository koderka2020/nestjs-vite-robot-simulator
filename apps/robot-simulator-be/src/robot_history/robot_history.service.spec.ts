import { Test, TestingModule } from '@nestjs/testing';
import { RobotHistoryService } from './robot_history.service';
import { PrismaService } from '../prisma/prisma.service';

describe('RobotHistoryService', () => {
  let service: RobotHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RobotHistoryService,
        {
          provide: PrismaService,
          useValue: {
            robotHistory: {
              create: jest.fn(),
              findFirst: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<RobotHistoryService>(RobotHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
