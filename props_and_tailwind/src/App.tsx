import './App.css'
import Card1 from './components/card1'

function App() {
  const myArr= [1,2,3];
  return (
    <>
      <h1 className='bg-yellow-400 text-black p-4 rounded-xl mb-4'>TailwindCSS</h1>
      <Card1 laptopName='MacBook' btnText='More about'/>
      <Card1 laptopName='Hp' btnText={myArr}/>
      <Card1 laptopName='Asus'/>
    </>
  )
}

export default App
