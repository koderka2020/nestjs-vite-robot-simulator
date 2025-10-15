function ReportButton({robot}: {robot: {direction?: string, x?: number, y?: number}}) {
  
  const printCurrentCoordinates = () => {
    console.log(robot.x, robot.y, robot.direction)
  }

  return (
    <button onClick={printCurrentCoordinates} className="bg-gray-800 col-start-2 col-end-4 rounded-lg px-6 py-2">Report</button>
  )
}

export default ReportButton