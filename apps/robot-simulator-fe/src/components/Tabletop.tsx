import { useEffect, useState } from 'react';
import Square from './Square';
import ReportButton from './buttons/ReportButton'
import MoveButton from './buttons/MoveButton';
import ResetButton from './buttons/ResetButton';
import DirectionButton from './buttons/DirectionButton';

// variables
const SIZE = 5;


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
  const [positionVisible, setPositionVisible] = useState(false);

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
    hidePosition();
    let validMove = false
    const newState: { direction?: string; x?: number; y?: number } = {...robot}
    console.log('robot:', robot);
    if (robot.y === undefined || robot.x === undefined) return false;
    if ( (dir == 'up' || dir == 'ArrowUp') && robot.y < 4 ){
      newState.y = robot.y + 1
      validMove = true
    }
    if ( (dir == 'down' || dir == 'ArrowDown' )&& robot.y > 0 ){
      newState.y = robot.y - 1
      validMove = true
    }
    if (( dir == 'left' || dir == 'ArrowLeft' )&& robot.x > 0 ){
      newState.x = robot.x - 1
      validMove = true
    }
    if ( (dir == 'right' || dir == 'ArrowRight' )&& robot.x < 4){
      newState.x = robot.x + 1
      validMove = true
    }

    if (validMove) {
      saveMove(newState);
    } 

    return validMove
  }

  useEffect(() => {
    getLatestPosition()
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {

      const validMove = validateMove(event.key as string)
      if (!validMove) {
        //here will go code for warning pop-up message, navigating player to click on the table
       console.log('Invalid move!')
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [robot]);

  const hidePosition = () => {
    setPositionVisible(false);
  };

  const updateDirection = (direction: {direction?: string}) => {
    hidePosition();
    const newState = { ...robot, ...direction }
    setRobot(newState)
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
    hidePosition();
    fetch('http://localhost:3000/api/robot-history', {
      method: 'DELETE',
    })
      .then(() => {
        const resetingDir = { ...newState, direction: 'up'}
        saveMove(resetingDir)
      })
  }
    
  return (
    <div className=" h-screen flex flex-col items-center justify-center" data-testid="tabletop-container">
      <div className="bg-gray-800 rounded-md px-5 py-3 "> 
        Click on the table to place the robot, use the buttons or arrows to move the robot
      </div>
      <div className="flex flex-col-reverse m-7" data-testid="tabletop-grid">
        {Array.from({ length: SIZE }, (_, idx) => (
          <div key={idx} className="flex flex-row">
          {Array.from({ length: SIZE }, (_, index) => (
            <Square key={index} robot={robot} dropHistory={dropHistory} y={idx} x={index}/>
          ))}
          </div>
        ))}
      </div>
    <div className="grid grid-cols-3 gap-5">
    <DirectionButton  updateDirection={updateDirection} buttonName="Left" y={robot.y} direction={robot.direction}/>
    <MoveButton robot={robot} validateMove={validateMove}/>
    <DirectionButton updateDirection={updateDirection} buttonName="Right" y={robot.y} direction={robot.direction}/>
    <ReportButton robot={robot} positionVisible={positionVisible} setPositionVisible={setPositionVisible}/>
    <ResetButton robot={robot} dropHistory={dropHistory}/>
    </div>
  </div>
  )
}

export default Tabletop