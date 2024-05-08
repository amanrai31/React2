import { useState } from 'react'
import './App.css'

function App() {

  const [color, setColor] = useState("red");

  return (
    <>
     <div  style={{backgroundColor: color, width: "100vw", height:"100vh", margin:"0px"}}>
     <div style={{ position: 'absolute', bottom: 10, left: 10, right:10, width: '90%', backgroundColor: '#333', padding: '10px 40px', borderRadius:50, }}>
    
        <button className="button1" style={{backgroundColor:"red"}} onClick={() => setColor("red")}> RED </button>
        <button className="button1" style={{backgroundColor:"green"}} onClick={() =>setColor("green")} > Green </button>
        <button className="button1" style={{backgroundColor:"blue"}} onClick={() =>setColor("blue")}  > Blue </button>
        <button className="button1" style={{backgroundColor:"black"}} onClick={() =>setColor("black")}  > Black </button>
        <button className="button1" style={{backgroundColor:"gray"}} onClick={() =>setColor("gray")}  > Gray </button>
        <button className="button1" style={{backgroundColor:"olive"}} onClick={() =>setColor("olive")} > Olive </button>
  </div>
     </div>
    </>
  )
}

export default App  
