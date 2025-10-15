export default function Square({ saveMove, dropHistory, y, x }:{ saveMove: (newState: { x: number; y: number }) => void, dropHistory: () => void, y: number, x: number}) {   
  
  const updateState = () => {
    const newState = { x: x, y: y };
    //when user clicks on the tabletop, drop the history of the most recent robot and save position of the new robot
    dropHistory()
    saveMove(newState);
  }

  return (
  <div className="w-25 h-25 bg-gray-800 text-blue-500 border border-solid border-gray-500 p-1 flex-shrink-0">
    <button onClick={updateState}>
      row={y} col={x}
    </button>
  </div>
)
}

