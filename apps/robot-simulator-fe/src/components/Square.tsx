import { useRef } from 'react';
import Robot from './Robot'
import clickSound from '../assets/sounds/click.wav'

export default function Square({ robot, dropHistory, y, x }:{ robot: { direction?: string; x?: number; y?: number }, dropHistory: (newState: { x?: number; y?: number }) => void, y: number, x: number}) {   
  const clickSoundRef = useRef(new Audio(clickSound))

  const updateState = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play()
    }
    const newState = { x: x, y: y };
    //when user clicks on the tabletop, drop the history of the most recent robot and save position of the new robot
    dropHistory(newState)
  }

  const isRobotHere = robot.x === x && robot.y === y;

  return (
    <button onClick={updateState} className="w-25 h-25 bg-gray-800 text-blue-500 p-3 border border-solid border-gray-500 flex-shrink-0 relative">
      {isRobotHere && <Robot direction={robot.direction || 'up'}/>}
    </button>
)
}

