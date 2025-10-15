import { useState } from 'react'

function MoveButton({buttonName, robot, saveMove}: {buttonName: string, robot: {direction?: string, x?: number, y?: number}, saveMove: (newState: { direction?: string; x?: number; y?: number }) => void}) {
  const [warning, showWarning] = useState(false)

  const warningInvalidMove = () => {
    showWarning(true)
    setTimeout(() => {
      showWarning(false)
    }, 3000)
  }
  
  const updateState = () => {
    if (robot.x === undefined || robot.y === undefined) {
      warningInvalidMove()
      return
    }
    
    let validMove = false
    const newState: { direction?: string; x?: number; y?: number } = {}

    if ( buttonName == 'Up' && robot.y < 4 ){
      newState.y = robot.y + 1
      validMove = true
    }
    if ( buttonName == 'Down' && robot.y > 0 ){
      newState.y = robot.y - 1
      validMove = true
    }
    if ( buttonName == 'Left' && robot.x > 0 ){
      newState.x = robot.x - 1
      validMove = true
    }
    if ( buttonName == 'Right' && robot.x < 4){
      newState.x = robot.x + 1
      validMove = true
    }
    
    if (validMove) {
      newState.direction = buttonName.toLowerCase()
      saveMove(newState);
    } else {
      warningInvalidMove()
    }
  }
  
  const buttonMessage = warning ? "Invalid move!" : buttonName
  
  return (
    <button 
      onClick={updateState} 
      className={`bg-cyan-700 text-gray-900 rounded-md ${warning ? 'px-2 py-2 bg-red-500' : 'px-7 py-2'}`}>
        {buttonMessage}
    </button>
  )
}

export default MoveButton