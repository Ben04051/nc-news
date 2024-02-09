import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Header from './Header'
import HomePage from './HomePage'
import ArticlePage from './ArticlePage'
import UserContext from '../contexts/UserContext'
import ErrorPage from './ErrorPage'

function App() {

  const [loggedInUser, setLoggedInUser] = useState({username: "grumpy19",
  name: "Paul Grump",
  avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013"})

  return (
    <>
      <Header/>
      <UserContext.Provider value={loggedInUser}>
      <Routes>
        <Route path="/" element ={<HomePage/>} />
        <Route path="/topics/:topic_query" element={<HomePage />} />
        <Route path= "/article/:article_id" element ={<ArticlePage/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
