import React from 'react'
import { useEffect,useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import {userContext} from '../../App'
export default function Logout() {
    const navigate=useNavigate()
    const {state,dispatch}=useContext(userContext)
    useEffect(()=> {
      fetch('/logout',{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
            },
            credentials:"include"
      }).then((res)=>{
        dispatch({type:"user",payload:false})
        dispatch({type:"admin",payload:false})
          navigate('/login')
        if(res!==200)
        {
        const err= new Error(res.error)
        throw err
        }
        else{
          
        }
      }).catch((err)=>{
            console.log("Error:",err);
      })
    },[])
  return (
    <>
    </>
  )
}
