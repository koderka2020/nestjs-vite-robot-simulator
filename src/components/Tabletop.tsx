
function Tabletop() {
  const test = {
    direction: 'north',
    x: 0,
    y: 0
  }
  const saveMovement = async(event: { preventDefault: () => void; }) => { 
    event.preventDefault();
    try {
      fetch('http://localhost:3000/api/robot-history', {
        method: 'POST',
        body: JSON.stringify(test),
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
  <>
    <button onClick={saveMovement}>TEST</button>
  </>
  )
}


export default Tabletop