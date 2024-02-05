import { useState } from 'react'
import Header from './Header'
import HomePage from './HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <HomePage />
    </>
  )
}

export default App
