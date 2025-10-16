import { useEffect, useState } from 'react';
import Square from './Square';
import ReportButton from './buttons/ReportButton'
import MoveButton from './buttons/MoveButton';
import ResetButton from './buttons/ResetButton';

// variables
const SIZE = 5;
const ALLOWED_MOVES = [ 'Left', 'Right', 'Up', 'Down']


function Tabletop() {
  const [robot, setRobot] = useState<{
    direction: string;
    x?: number;
    y?: number;
  }>({
    direction: 'up',
    x: undefined,
    y: undefined
  });

  useEffect(() => {
    getLatestPosition()
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {

      const validMove = validateMove(event.key as string)
      if (!validMove) {
        //here would go code for warning pop-up message, navigating player to click on the table
       console.log('Invalid move!')
      }

    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [robot]);

  const getLatestPosition = async () => {
    fetch('http://localhost:3000/api/robot-history/latest')
      .then(response => response.json())
      .then(data => {
        if ( !data ) return
        setRobot({
        direction: data.direction,
        x: data.x,
        y: data.y,
      })
    })
      .catch(error => console.error('Error:', error));
  }

  const validateMove = (dir:string) => {
    console.log('dir:', dir);
    let validMove = false
    const newState: { direction?: string; x?: number; y?: number } = {...robot}

    if (robot.y === undefined || robot.x === undefined) return false;
    if ( (dir == 'Up' || dir == 'ArrowUp') && robot.y < 4 ){
      newState.y = robot.y + 1
      newState.direction = 'up'
      validMove = true
    }
    if ( (dir == 'Down' || dir == 'ArrowDown' )&& robot.y > 0 ){
      newState.y = robot.y - 1
      newState.direction = 'down'
      validMove = true
    }
    if (( dir == 'Left' || dir == 'ArrowLeft' )&& robot.x > 0 ){
      newState.x = robot.x - 1
      newState.direction = 'left'
      validMove = true
    }
    if ( (dir == 'Right' || dir == 'ArrowRight' )&& robot.x < 4){
      newState.x = robot.x + 1
      newState.direction = 'right'
      validMove = true
    }

    if (validMove) {
      saveMove(newState);
    } 

    return validMove
  }

  const saveMove = async(newState: { direction?: string; x?: number; y?: number }) => { 
    
    const update = {
        ...robot,
        ...newState,
      }

    setRobot(prev => ({...prev, ...update}))
    console.log('newState:', newState);
    if (newState.x === undefined || newState.y === undefined) return;

    try {
      const response = await fetch('http://localhost:3000/api/robot-history', {
        method: 'POST',
        body: JSON.stringify(update),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
    }

  const dropHistory = async (newState: { x?: number; y?: number }) => {
    fetch('http://localhost:3000/api/robot-history', {
      method: 'DELETE',
    })
      .then(() => {
        const resetingDir = { ...newState, direction: 'up'}
        saveMove(resetingDir)
      })
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
            <Square key={index} robot={robot} dropHistory={dropHistory} y={idx} x={index}/>
          ))}
          </div>
        ))}
      </div>
    <div className="grid grid-cols-4 gap-5">
      {ALLOWED_MOVES.map((move, idx) => (
        <MoveButton key={idx} validateMove={validateMove} buttonName={move}/>
      ))}
     <ReportButton robot={robot}/>
     <ResetButton dropHistory={dropHistory}/>
    </div>
  </div>
  )
}


export default Tabletop