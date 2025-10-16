import { useState, useRef, useEffect } from 'react'
import clickSound from '../../assets/sounds/click.wav'

function MoveButton({y, buttonName, validateMove}: {y?:number, buttonName: string, validateMove: (buttonName: string) => boolean}) {
  const [warning, showWarning] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const clickSoundRef = useRef(new Audio(clickSound))

  useEffect(() => {
    if ( y !== undefined ) {
      setDisabled(false)
    }
  }, [y])

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

    const validMove = validateMove(buttonName)
    console.log('validMove:', validMove);
    if (!validMove) {
      warningInvalidMove()
    }
  }
  
  const buttonMessage = warning ? "Invalid move!" : buttonName
  
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