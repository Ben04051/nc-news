import UserContext from  '../contexts/UserContext'
import {useContext} from 'react'
import './Header.css'
import {Link} from "react-router-dom"


export default function Header() {
    const loggedInUser=useContext(UserContext)
    return <div className='header-container'>
        <div className='left-box'>
        <Link key="Home" to={"/"} style={{textDecoration: 'none'}}><h1>NC News</h1> </Link>
        </div>
        <div className='right-box'>
        <img className="profile-picture" src={loggedInUser.avatar_url} alt="your profile picture"></img>
        </div>
    </div>
}