import React, { useEffect } from 'react'
import {toast} from 'react-toastify';
import {useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
const CryptoJS = require("crypto-js");
const SECRET_KEY=process.env.REACT_APP_SECRET_KEY

export default function VerifyEmail() {
  const navigate=useNavigate()
  let { id } = useParams()
  useEffect(()=>{
    const verifyEmail=async ()=>{
  try {
    id=id.toString().replace('xMl3Jk', '+' ).replace('Por21Ld', '/').replace('Ml32', '=');
    const bytes = CryptoJS.AES.decrypt(id, SECRET_KEY);
    id = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const res= await fetch(`/verifyEmail?id=${id}`,{
      method:"GET",
      headers:{
        'Accept': "application/json",
      },
      credentials:"include"
    })
    if(res.status!==200)
    {
      const error= new Error(res.error)
      throw error
    }
    else {
      toast('Your Email is verified, Please Login!') 
        navigate("/login")
    }
  
  } 
  catch (err) {
    console.log('err:'+ err)
  }
    }
    verifyEmail()
    },[])
 

  return (
    
<></>
  )
}
