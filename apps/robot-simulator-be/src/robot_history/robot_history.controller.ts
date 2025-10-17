import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Delete,
  NotFoundException,
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

  // @Get()
  // findAll() {
  //   return this.robotHistoryService.findAll();
  // }

  @Get('latest')
  async findOne() {
    const result = await this.robotHistoryService.findOne();
    if (!result) {
      throw new NotFoundException('No robot history found');
    }
    return result;
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
