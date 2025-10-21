import { useEffect, useRef, useState } from 'react';
import clickSound from '../../assets/sounds/click.wav'
import type { RobotType, DropHistoryType } from '../../types/types'

function ResetButton({robot, dropHistory}: {robot: RobotType, dropHistory: DropHistoryType}) {  
  const clickSoundRef = useRef(new Audio(clickSound))
  const [disabled, setDisabled] = useState(true)
    
  useEffect(() => {
    if (robot.x !== undefined && robot.y !== undefined) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [robot.x, robot.y])

  const handleClick = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play()
    }
    dropHistory({ x: undefined, y: undefined })
  }
  
  return (
    <button 
      disabled={disabled} 
      onClick={handleClick} 
      className="bg-red-900 hover:bg-red-700 border-cyan-600 border-1 col-start-2 col-end-3 rounded-lg py-2 w-40 text-center">
        Reset Table
    </button>
  )
}

export default ResetButton