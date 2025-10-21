import { useState, useRef, useEffect } from 'react'
import clickSound from '../../assets/sounds/click.wav'

type UpdateDirectionType = (direction: {direction?: string}) => void

function DirectionButton({y, direction,  buttonName, updateDirection}: {y?:number, direction:string, buttonName: string, updateDirection: UpdateDirectionType}) {
  const [disabled, setDisabled] = useState(true)
  const clickSoundRef = useRef(new Audio(clickSound))

  useEffect(() => {
    if ( y !== undefined ) {
      setDisabled(false)
    }
  }, [y])

  
  const handleClick = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play()
    }
    const directionsArray = ['up', 'right', 'down', 'left']
    const index = directionsArray.indexOf(direction.toLowerCase())
    let newDirection = ''
    
    if (buttonName === 'Left') {
      if (index === 0) {
        newDirection = directionsArray[directionsArray.length - 1]
      } else {
        newDirection = directionsArray[index - 1]
      }
    } else if (buttonName === 'Right'){
      if (index === directionsArray.length - 1) {
        newDirection = directionsArray[0]
      } else {
        newDirection = directionsArray[index + 1]
      }
    }
      updateDirection({direction: newDirection});
  }
    
  return (
    <button 
      disabled={disabled}
      onClick={handleClick} 
      className={`bg-cyan-600 text-gray-900 hover:bg-cyan-800 rounded-md`}>
        {buttonName}
    </button>
  )
}

export default DirectionButton