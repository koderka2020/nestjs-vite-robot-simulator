import { Injectable } from '@nestjs/common';
import { CreateRobotHistoryDto } from './dto/create-robot_history.dto';
// import { UpdateRobotHistoryDto } from './dto/update-robot_history.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RobotHistory } from '@prisma/client';

@Injectable()
export class RobotHistoryService {
  constructor(private readonly prismaService: PrismaService) {}
  // create record in db for every robot's movement:
  async create(
    createRobotHistoryDto: CreateRobotHistoryDto,
  ): Promise<RobotHistory> {
    try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return await this.prismaService.robotHistory.create({
        data: { ...createRobotHistoryDto },
      });
    } catch (error) {
      throw new Error('Failed to create robot history due to: ' + error);
    }
  }

  // get all records/movement's history from db:
  findAll() {
    return `This action returns all robotHistory`;
  }

  // find most recent recod/move info:
  findOne(id: number) {
    return `This action returns a #${id} robotHistory`;
  }

  // update(id: number, updateRobotHistoryDto: UpdateRobotHistoryDto) {
  //   return `This action updates a #${id} robotHistory`;
  // }

  // delete history of robot's movements
  remove(id: number) {
    return `This action removes a #${id} robotHistory`;
  }
}
