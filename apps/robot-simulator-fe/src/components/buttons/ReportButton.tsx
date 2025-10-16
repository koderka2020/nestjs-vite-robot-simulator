import { useState, useRef, useEffect } from 'react'
import clickSound from '../../assets/sounds/click.wav'

function ReportButton({robot}: {robot: {direction?: string, x?: number, y?: number}}) {
  const [positionVisble, showPosition] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const clickSoundRef = useRef(new Audio(clickSound))

  useEffect(() => {
    if (robot.x !== undefined && robot.y !== undefined) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [robot.x, robot.y])

  const printCurrentCoordinates = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play()
    }
    if (robot.x === undefined || robot.y === undefined) {
      return
    }
    showPosition(true)
    setTimeout(() => {
      showPosition(false)
    }, 3000)
  }


  const buttonMessage = positionVisble ? `Position: ${robot.x}, ${robot.y}, ${robot.direction}` : 'Report Position'

  return (
      <button 
      disabled={disabled}
      onClick={printCurrentCoordinates} 
      className="bg-gray-800 hover:bg-gray-700 border-cyan-600 border-1 col-start-2 col-end-3 rounded-lg px-8 py-2">
        {buttonMessage}
      </button>
  )
}

export default ReportButton