import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RobotHistoryService } from './robot_history.service';
import { CreateRobotHistoryDto } from './dto/create-robot_history.dto';
// import { UpdateRobotHistoryDto } from './dto/update-robot_history.dto';

@Controller('robot-history')
export class RobotHistoryController {
  constructor(private readonly robotHistoryService: RobotHistoryService) {}

  @Post()
  create(@Body() createRobotHistoryDto: CreateRobotHistoryDto) {
    return this.robotHistoryService.create(createRobotHistoryDto);
  }

  @Get()
  findAll() {
    return this.robotHistoryService.findAll();
  }

  @Get('latest')
  findOne() {
    return this.robotHistoryService.findOne();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRobotHistoryDto: UpdateRobotHistoryDto) {
  //   return this.robotHistoryService.update(+id, updateRobotHistoryDto);
  // }

  @Delete()
  remove() {
    return this.robotHistoryService.remove();
  }
}
