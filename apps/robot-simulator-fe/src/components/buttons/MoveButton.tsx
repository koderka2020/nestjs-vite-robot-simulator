import { useState, useRef, useEffect } from 'react'
import clickSound from '../../assets/sounds/click.wav'
import type { RobotType } from '../../types/types'

type ValidateMoveType = (direction: string) => boolean

function MoveButton({robot, validateMove}: {robot: RobotType, validateMove: ValidateMoveType}) {
  const [warning, showWarning] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const clickSoundRef = useRef(new Audio(clickSound))

  useEffect(() => {
    if (robot.x !== undefined && robot.y !== undefined) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [robot.x, robot.y, robot.direction])

  const warningInvalidMove = () => {
    showWarning(true)
    setTimeout(() => {
      showWarning(false)
    }, 3000)
  }
  
  const handleClick = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play()
    }
    const validMove = validateMove(robot.direction || 'up')
    console.log('validMove:', validMove);
    if (!validMove) {
      warningInvalidMove()
    }
  }
  
  const buttonMessage = warning ? "Invalid move!" : "Move"
  
  return (
    <button 
      disabled={disabled}
      onClick={handleClick} 
      className={`bg-cyan-600 text-gray-900 hover:bg-cyan-800 rounded-md ${warning ? 'px-2 py-2 bg-red-500 hover:bg-red-700' : 'px-7 py-2 hover:bg-cyan-800'}`}>
        {buttonMessage}
    </button>
  )
}

export default MoveButton