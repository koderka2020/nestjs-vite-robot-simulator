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
      return await this.prismaService.robotHistory.create({
        data: { ...createRobotHistoryDto },
      });
    } catch (error) {
      throw new Error('Failed to create robot history due to: ' + error);
    }
  }

  // get all records/movement's history from db:
  // async findAll(): Promise<RobotHistory[]> {
  //   try {
  //     //first check if there are any records in the database
  //     const count = await this.prismaService.robotHistory.count();
  //     if (count === 0) {
  //       return [];
  //     }
  //     return await this.prismaService.robotHistory.findMany();
  //   } catch (error) {
  //     throw new Error('Failed to get all robot history due to: ' + error);
  //   }
  // }

  // find most recent recod/move info:
  async findOne(): Promise<{
    id?: string;
    x?: number;
    y?: number;
    direction?: string;
    created_at?: Date;
  } | null> {
    try {
      // First check if there are any records in the database
      const count = await this.prismaService.robotHistory.count();
      if (count === 0) {
        // Return null if no records exist
        return null;
      }

      return await this.prismaService.robotHistory.findFirst({
        orderBy: {
          created_at: 'desc',
        },
      });
    } catch (error) {
      throw new Error(
        'Failed to get most recent robot history due to: ' + error,
      );
    }
  }

  // update(id: number, updateRobotHistoryDto: UpdateRobotHistoryDto) {
  //   return `This action updates a #${id} robotHistory`;
  // }

  // delete history of robot's movements
  async remove() {
    try {
      await this.prismaService.robotHistory.deleteMany();
      return { message: 'All robot history deleted successfully' };
    } catch (error) {
      throw new Error('Failed to remove all robot history due to: ' + error);
    }
  }
}
