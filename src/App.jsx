import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Socket from './components/Socket'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Socket/>
       </div>
    </>
  )
}

export default App
