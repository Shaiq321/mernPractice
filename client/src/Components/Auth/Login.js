import React,{useContext, useState} from 'react'
import {useNavigate } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'; 
import validator from 'validator'
import {userContext} from '../../App'
import { NavLink } from 'react-router-dom'
export default function Login() {
  const navigate=useNavigate()
  const {dispatch}=useContext(userContext)
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const Login= async (e)=>{
    e.preventDefault()
    if(!email || !password)
    {
      toast('Fill All Fields')
    }
    else if(!validator.isEmail(email)){
      toast('Email is invalid')
       }
    else {
    const res= await fetch('/login',{
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify({email,password})
    })
    if(res.status===200)
    {
      dispatch({type:"user",payload:true})
      toast('User Login Successful')
      console.log("User Login Successful")
      navigate("/")
    }
    else if(res.status===201)
    {
      dispatch({type:"admin",payload:true})
      toast('Admin Login Successful')
      console.log("Admin Login Successful")
      navigate("/")
    }
    else if (res.status===401){
      toast("Please verify Email, check Mail Inbox")
    }
    else{
      console.log("data.status")
      toast('Invalid Login')
      console.log("Invalid Login")
    }
  }
  }
  
  return (
   <>
    <section className="" style={{backgroundColor: "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100" >
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px",marginTop:"20px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                <form method='POST' className="mx-1 mx-md-4">
              <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} autoComplete="on" id="form3Example3c" className="form-control" />
                      <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} autoComplete="on" id="form3Example4c" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                    </div>
                    
                  </div>


                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" onClick={Login} className="btn btn-primary btn-lg">SignIn</button>
                  <ToastContainer/>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="forgetPassword form-outline flex-fill mb-0">
                    <NavLink to="/resetPassword">Forget Password?</NavLink>
                    </div>
                    <div className="signupLink form-outline flex-fill mb-0" >
                    <NavLink to="/signup">Don't have an account? Signup</NavLink>
                    </div>
                    
                  </div>
                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="ImageError"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

   </>
    )
}
