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
    if ( buttonName == 'Up' && robot.y < 4 ){
      validMove = true
    }
    if ( buttonName == 'Down' && robot.y > 0 ){
      validMove = true
    }
    if ( buttonName == 'Left' && robot.x > 0 ){
      validMove = true
    }
    if ( buttonName == 'Right' && robot.x < 4){
      validMove = true
    }
    
    if (validMove) {
      saveMove({ direction: buttonName.toLowerCase() });
    } else {
      warningInvalidMove()
    }
  }
  
  const buttonMessage = warning ? "Invalid move!" : buttonName
  
  return (
    <button 
      onClick={updateState} 
      className={`bg-gray-800 rounded-md ${warning ? 'px-2 py-2' : 'px-7 py-2'}`}>
        {buttonMessage}
    </button>
  )
}

export default MoveButton