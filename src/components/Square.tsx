export default function Square({ saveMove, robot }: { saveMove: (event: { preventDefault: () => void }) => void, robot: { direction: string, x?: number, y?: number }}) { 
  return (
  <div className="w-20 h-20 bg-gray-800 text-blue-500 border border-solid border-gray-500 p-1">
    <button onClick={saveMove}>
      {robot.direction} {robot.x} {robot.y}
    </button>
  </div>
)
}

