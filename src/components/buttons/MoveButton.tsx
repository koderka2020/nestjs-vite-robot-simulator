function MoveButton({buttonName, saveMove}: {buttonName: string, saveMove: (newState: { direction?: string; x?: number; y?: number }) => void}) {
  
  const updateState = () => {
    const newState = { direction: buttonName };
    saveMove({...newState});
  }
  
  return (
    <button 
      onClick={updateState} 
      className="bg-gray-800 rounded-md px-7 py-2">
        {buttonName}
    </button>
  )
}

export default MoveButton