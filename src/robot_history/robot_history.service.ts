import { Injectable } from '@nestjs/common';
import { CreateRobotHistoryDto } from './dto/create-robot_history.dto';
// import { UpdateRobotHistoryDto } from './dto/update-robot_history.dto';

@Injectable()
export class RobotHistoryService {
  // create record in db for every robot's movement:
  create(createRobotHistoryDto: CreateRobotHistoryDto) {
    console.log(createRobotHistoryDto);
    return 'This action adds a new robotHistory';
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
