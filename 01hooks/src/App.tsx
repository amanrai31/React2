import { useState } from 'react'

function App() {

const [counter, setCounter] = useState(10)      // [value/variable, function/reference holder] 

const addValue = () => {                       // As arrow function
  setCounter(counter+1);
  if(counter>=25){
    setCounter(25)
  }
}
function removeValue() {                     // Usual Function
  setCounter(counter-1);
  if(counter<= -5){
    setCounter(-5)
  }
}
return (
    <>
    <h1>Counter value = {counter} </h1>
    <button onClick={addValue}> Add Value</button>
    <br/> <br/>
    <button onClick={removeValue}> Remove Value</button>
    <h1> Counter*2= {counter*2}</h1>
    <h1>UI update on variable change</h1>
    <p> MAX value = 25, MIN value = -5, Default value = 10 </p>
    </>
  )
}

export default App
