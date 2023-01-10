import './App.css';
import { createContext,useEffect, useReducer, useState } from 'react';
import Navbar from './Components/Navbar';
import {Route, Routes} from 'react-router-dom'
import About from './Components/MyGroup/About';
import Contact from './Components/Contact';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import VerifyEmail from './Components/Auth/VerifyEmail';
import Logout from './Components/Auth/Logout';
import Home from './Components/Home/Home';
import Custom404 from './Components/Custom404';
import FooterSuggestion from './Components/FooterSuggestion';
import 'react-toastify/dist/ReactToastify.css'; 
import {ErrorBoundary} from 'react-error-boundary'
import ResetPassword from './Components/Auth/ResetPassword';
function ErrorHandler({error}) {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  )
}
const initialState=null
const userContext=createContext()
const userDataContext=createContext()
const reducer=(state,action)=>{
  if(action.type==="user")
  {
    return action.payload;
  }
  if(action.type==="admin" )
  {
    if(action.payload)
    {
      return "admin";
    }
    else return false
  
  }
  
  return state;
}
const Routing=()=>{
  return (
  <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/home/:id" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/resetPassword" element={<ResetPassword/>} />
          <Route path="/verify/:id" element={<VerifyEmail/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="*" element={<Custom404/>}/>
    </Routes>
  )
}

function App() {
  const [userData,setUserData]=useState({email:''})
      const userValidity=async ()=>{
    try {
      const res= await fetch('/userValidity',{
        method:"GET",
        headers:{
          Accept: "application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      const data= await res.json()
       if(data)
       {
        setUserData(data)
        if(data.role==="admin")
        {
          dispatch({type:"admin",payload:true})
        }
        else dispatch({type:"user",payload:true})
      }
    
      if(res.status!==200)
      {
        const error= new Error(res.error)
        throw error
      }
     
    } catch (err) {
      console.log('err:'+ err)
      dispatch({type:"user",payload:false}) 
    }
  }

 useEffect(()=>{
  userValidity()
 },[])
 const [state,dispatch]=useReducer(reducer,initialState)
  return (
  <ErrorBoundary FallbackComponent={ErrorHandler}>
    <userContext.Provider value={{state,dispatch}}>
    <Navbar/> 
    <userDataContext.Provider value={userData}>

    <Routing/> 

    </userDataContext.Provider>
    <FooterSuggestion/>
    </userContext.Provider>
   </ErrorBoundary>
   
  );
}

export default App;
export {userContext,userDataContext}
