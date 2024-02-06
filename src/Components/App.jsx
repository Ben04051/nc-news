import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Header from './Header'
import HomePage from './HomePage'
import ArticlePage from './ArticlePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element ={<HomePage/>} />
        <Route path= "/article/:article_title/:article_id" element ={<ArticlePage/>} />
      </Routes>
    </>
  )
}

export default App
