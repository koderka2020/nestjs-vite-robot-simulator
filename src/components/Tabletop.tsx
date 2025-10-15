import { useEffect, useState } from 'react';
import Square from './Square';

// variable for the number of squares on the tabletop
const SIZE = 5;

function Tabletop() {
  const [robot, setRobot] = useState({
    direction: 'north',
    x: undefined,
    y: undefined
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/robot-history/latest')
      .then(response => response.json())
      .then(data => setRobot(data))
      .catch(error => console.error('Error:', error));
  }, []);


  const saveMove = async(event: { preventDefault: () => void; }) => { 
    event.preventDefault();
    try {
      fetch('http://localhost:3000/api/robot-history', {
        method: 'POST',
        body: JSON.stringify(robot),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
   } catch (error) {
    console.error('Error:', error);
   }

    }
    
  return (
    <div className="h-screen flex content-center justify-center items-center">
      <div className="grid grid-cols-5">
        {Array.from({ length: SIZE * SIZE }, (_, index) => (
          <Square key={index} saveMove={saveMove} robot={robot}/>
        ))}
      </div>
  </div>
  )
}


export default Tabletop