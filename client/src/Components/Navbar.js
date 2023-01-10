import React, { useContext,useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom'
import logo from '../Images/logo-white.png'
import {userContext} from '../App'
import '../style.css'
export default function Navbar() {  
const {state,dispatch}= useContext(userContext)

  const CustomMenu=()=>
{
  if(state)
  {
    return(
    <>
  <li className="nav-item">
  <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
</li>
<li className="nav-item">
  <NavLink className="nav-link" to="/about">My Group</NavLink>
</li>
<li className="nav-item">
  <NavLink className="nav-link" to="/contact">Contact</NavLink>
</li>
<li className="nav-item">
  <NavLink className="nav-link" to="/logout">Logout</NavLink>
</li>
</>)
  }
  else
  {return(
    <>
  <li className="nav-item">
  <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to="/about">My Group</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to="/contact">Contact</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className="nav-link" to="/login">Login</NavLink>
</li>
<li className="nav-item">
  <NavLink className="nav-link" to="/signup">SignUp</NavLink>
</li>
  </>)
  }
}
  return (
  <>
 
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">
      <img className="" src={logo} alt='logo' width='250px'></img>
    </NavLink>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <CustomMenu />
      </ul>
    </div>
  </div>
</nav>
  </>
  )
}
