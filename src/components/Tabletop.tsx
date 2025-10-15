import { useEffect, useState } from 'react';
import Square from './Square';

// variable for the number of squares on the tabletop
const SIZE = 5;

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

  const saveMove = async(newState: { direction: string; x: number; y: number }) => { 
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
          setRobot(newState);
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
    <>
    <h3>Latest position: {robot.direction} {robot.x} {robot.y}</h3>
    <div className="h-screen flex content-center justify-center items-center">
      <div className="flex flex-col-reverse m-3">
        {Array.from({ length: SIZE }, (_, idx) => (
          <div key={idx} className="flex flex-row">
          {Array.from({ length: SIZE }, (_, index) => (
            <Square key={index} saveMove={saveMove} dropHistory={dropHistory} robot={robot} y={idx} x={index}/>
          ))}
          </div>
        ))}
      </div>
    </div>
  </>
  )
}


export default Tabletop