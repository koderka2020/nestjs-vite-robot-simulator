import { useEffect, useRef, useState } from 'react';
import clickSound from '../../assets/sounds/click.wav'

function ResetButton({robot, dropHistory}: {robot: {x?: number, y?: number}, dropHistory: (newState: { direction?: string; x?: number; y?: number }) => void}) {  
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
      className="bg-red-900 hover:bg-red-700 border-cyan-600 border-1 col-start-2 col-end-3 rounded-lg px-8 py-2">
        Reset Table
    </button>
  )
}

export default ResetButton