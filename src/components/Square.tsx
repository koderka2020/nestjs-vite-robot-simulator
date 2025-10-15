export default function Square({ dropHistory, y, x }:{ dropHistory: (newState: { x?: number; y?: number }) => void, y: number, x: number}) {   
  
  const updateState = () => {
    const newState = { x: x, y: y };
    //when user clicks on the tabletop, drop the history of the most recent robot and save position of the new robot
    dropHistory(newState)
  }

  return (
    <button onClick={updateState} className="w-25 h-25 bg-gray-800 text-blue-500 border border-solid border-gray-500 p-1 flex-shrink-0">
      row={y} col={x}
    </button>
)
}

