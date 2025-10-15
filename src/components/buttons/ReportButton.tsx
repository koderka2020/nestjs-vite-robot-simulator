import { useState } from 'react'

function ReportButton({robot}: {robot: {direction?: string, x?: number, y?: number}}) {
  const [positionVisble, showPosition] = useState(false)

  const printCurrentCoordinates = () => {
    showPosition(true)
    setTimeout(() => {
      showPosition(false)
    }, 3000)
  }


  const buttonMessage = positionVisble ? `Position: ${robot.x}, ${robot.y}, ${robot.direction}` : 'Report'

  return (
      <button 
      onClick={printCurrentCoordinates} 
      className="bg-gray-800 col-start-2 col-end-4 rounded-lg px-6 py-2">
        {buttonMessage}
      </button>
  )
}

export default ReportButton