import { useEffect, useState } from 'react';
import Square from './Square';
import ReportButton from './buttons/ReportButton'
import MoveButton from './buttons/MoveButton';

// variable for the number of squares on the tabletop
const SIZE = 5;
const ALLOWED_MOVES = [ 'Left', 'Right', 'Up', 'Down']

function Tabletop() {
  const [robot, setRobot] = useState<{
    direction: string;
    x?: number;
    y?: number;
  }>({
    direction: 'north',
    x: undefined,
    y: undefined
  });

  useEffect(() => {
    getLatestPosition()
  }, []);

  const getLatestPosition = async () => {
    fetch('http://localhost:3000/api/robot-history/latest')
      .then(response => response.json())
      .then(data => setRobot(data))
      .catch(error => console.error('Error:', error));
  }

  const saveMove = async(newState: { direction?: string; x?: number; y?: number }) => { 
    try {
      fetch('http://localhost:3000/api/robot-history', {
        method: 'POST',
        body: JSON.stringify(newState),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setRobot(prevState => ({
            ...prevState,
            ...newState
          }));
        })
        .catch(error => console.error('Error:', error));
   } catch (error) {
    console.error('Error:', error);
   }
    }

  const dropHistory = async () => {
    fetch('http://localhost:3000/api/robot-history', {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }
    
  return (
    <div className=" h-screen flex flex-col items-center justify-center">
    <div className="bg-gray-800 rounded-md px-5 py-3 "> 
      Click on the table to place the robot, use the buttons or arrows to move the robot
    </div>
      <div className="flex flex-col-reverse m-7">
        {Array.from({ length: SIZE }, (_, idx) => (
          <div key={idx} className="flex flex-row">
          {Array.from({ length: SIZE }, (_, index) => (
            <Square key={index} saveMove={saveMove} dropHistory={dropHistory} y={idx} x={index}/>
          ))}
          </div>
        ))}
      </div>
    <div className="grid grid-cols-4 gap-5">
      {ALLOWED_MOVES.map((move, idx) => (
        <MoveButton key={idx} saveMove={saveMove} buttonName={move}/>
      ))}
     <ReportButton robot={robot}/>
    </div>
  </div>
  )
}


export default Tabletop