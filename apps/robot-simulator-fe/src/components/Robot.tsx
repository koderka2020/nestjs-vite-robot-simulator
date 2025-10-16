import { RiRobot3Fill } from "react-icons/ri";

function Robot({direction}: {direction: string}) {
  const getArrowPosition = () => {
    switch (direction.toLowerCase()) {
      case 'up':
        return 'top-0 left-1/2 transform -translate-x-1/2'
      case 'down':
        return 'bottom-0 left-1/2 transform -translate-x-1/2'
      case 'left':
        return 'left-0 top-1/2 transform -translate-y-1/2'
      case 'right':
        return 'right-0 top-1/2 transform -translate-y-1/2'
      default:
        return 'top-0 left-1/2 transform -translate-x-1/2'
    }
  }

  const getArrowIcon = () => {
    switch (direction.toLowerCase()) {
      case 'up':
        return (
          <svg className="w-3 h-3 text-cyan-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"/>
          </svg>
        )
      case 'down':
        return (
          <svg className="w-3 h-3 text-cyan-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
          </svg>
        )
      case 'left':
        return (
          <svg className="w-3 h-3 text-cyan-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
          </svg>
        )
      case 'right':
        return (
          <svg className="w-3 h-3 text-cyan-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex relative items-center justify-center w-full h-full">
      <div className={`absolute ${getArrowPosition()}`}>
        {getArrowIcon()}
      </div>
      <RiRobot3Fill className="w-8 h-8 text-cyan-500 absolute" />
    </div>
  )
}

export default Robot