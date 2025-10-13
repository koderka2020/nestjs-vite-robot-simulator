import { PartialType } from '@nestjs/mapped-types';
import { CreateRobotHistoryDto } from './create-robot_history.dto';

export class UpdateRobotHistoryDto extends PartialType(CreateRobotHistoryDto) {}
