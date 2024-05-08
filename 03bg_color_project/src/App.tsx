import { useState } from 'react'
import './App.css'

function App() {

  const [color, setColor] = useState("lavender");

  return (
    <>
     <div  style={{backgroundColor: color, width: "100vw", height:"100vh", margin:"0px", transitionDuration:"0.5s",}}>
     <div style={{ position: 'absolute', display:"flex",justifyContent: 'center', alignItems: 'center', bottom: 10, left: 10, width: '90%', backgroundColor: '#333', padding: '10px 40px', borderRadius:50, }}>
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

{/* <div className="w-full h-screen duration-1000"
style={{ backgroundColor: color }}>
<div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
  <div className="flex flex-wrap justify-centre gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
    <button onClick={()=> setColor("red")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
      style={{ backgroundColor: "red"  }}>
      Red
    </button>
  <div/>
<div/>
<div/> */}     // -- Tailwind

 
