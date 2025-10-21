export interface RobotType {
  direction?: string;
  x?: number;
  y?: number;
}

export type DropHistoryType = (newState: { x?: number; y?: number }) => void