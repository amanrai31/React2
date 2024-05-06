import { useState } from 'react'

function App() {

let [counter, setCounter] = useState(10)      // [value/variable, function/reference holder] 

const addValue = () => {                       // As arrow function
  counter +=1;
  if(counter>=25){
    counter = 25;
  }
  setCounter(counter);
}
function removeValue() {                     // Usual Function
  counter -=1;
  if(counter<= -5){
    counter = -5;
  }
  setCounter(counter--);
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
