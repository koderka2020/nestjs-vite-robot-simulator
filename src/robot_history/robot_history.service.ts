import { Injectable } from '@nestjs/common';
import { CreateRobotHistoryDto } from './dto/create-robot_history.dto';
import { UpdateRobotHistoryDto } from './dto/update-robot_history.dto';

@Injectable()
export class RobotHistoryService {
  create(createRobotHistoryDto: CreateRobotHistoryDto) {
    return 'This action adds a new robotHistory';
  }

  findAll() {
    return `This action returns all robotHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} robotHistory`;
  }

  update(id: number, updateRobotHistoryDto: UpdateRobotHistoryDto) {
    return `This action updates a #${id} robotHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} robotHistory`;
  }
}
