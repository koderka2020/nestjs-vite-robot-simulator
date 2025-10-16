import { useRef } from 'react';
import clickSound from '../../assets/sounds/click.wav'

function ResetButton({dropHistory}: {dropHistory: (newState: { direction?: string; x?: number; y?: number }) => void}) {  
  const clickSoundRef = useRef(new Audio(clickSound))
    
  const handleClick = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play()
    }
    dropHistory({ x: undefined, y: undefined })
  }
  
  return (
    <button onClick={handleClick} className="bg-red-900 hover:bg-gray-700 border-cyan-600 border-1 col-start-2 col-end-4 rounded-lg px-6 py-2">Reset Table</button>
  )
}

export default ResetButton