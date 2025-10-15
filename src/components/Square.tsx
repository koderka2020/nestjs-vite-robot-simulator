export default function Square({ saveMove, robot, y, x }: { saveMove: (newState: { direction: string; x: number; y: number }) => void, robot: { direction: string}, y: number, x: number}) {   
  
  const updateState = () => {
    const newState = { direction: robot.direction, x: x, y: y };
    saveMove(newState);
  }

  return (
  <div className="w-20 h-20 bg-gray-800 text-blue-500 border border-solid border-gray-500 p-1 flex-shrink-0">
    <button onClick={updateState}>
      {robot.direction} row={y} col={x}
    </button>
  </div>
)
}

