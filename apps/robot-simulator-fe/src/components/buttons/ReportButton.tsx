import { useState, useRef, useEffect } from 'react'
import clickSound from '../../assets/sounds/click.wav'
import type { RobotType } from '../../types/types'

function ReportButton({robot, positionVisible, setPositionVisible}: {robot:RobotType, positionVisible: boolean, setPositionVisible: (visible: boolean) => void}) {
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
    setPositionVisible(true)
    setTimeout(() => {
      setPositionVisible(false)
    }, 2000)
  }


  const buttonMessage = positionVisible ? `x:${robot.x} y:${robot.y} direction:${robot.direction}` : 'Report Position'

  return (
      <button 
      disabled={disabled}
      onClick={printCurrentCoordinates} 
      className="bg-gray-800 hover:bg-gray-700 border-cyan-600 border-1 col-start-2 col-end-3 rounded-lg py-2 w-40 text-center {positionVisble? px1 : px8}">
        {buttonMessage}
      </button>
  )
}

export default ReportButton