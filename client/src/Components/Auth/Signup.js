import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import validator from 'validator'
import {toast, ToastContainer} from 'react-toastify';
import CountrySelector from './CountrySelector';
export default function Signup() {
  const navigate=useNavigate()
  const [user,setUser]=useState({
    name:'', email:'',country:'', phone:'', work:'', password:'', cpassword:''
})
let name,value
const handleInput =(e)=>{
console.log(e)
name=e.target.name
value=e.target.value
setUser({...user, [name]:value})
}
const postData= async (e)=>{
  e.preventDefault()
  const {name,email,country,phone,work,password,cpassword}=user
  if(!name || !email || !country || !phone || !work || !password || !cpassword)
  {
    toast('Fill All Fields')
  }
  else{
    if(!validator.isEmail(email)){
      toast('Email is invalid')
     }
      else if(password.length<8) {
      toast('Password invalid')
    }
     else if(!validator.equals(password,cpassword))
     {
         toast('Password not equal')
     }
     else {
  const res= await fetch('/register',{
    method: "POST",
    headers:{
      'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({name,email,country,phone,work,password,cpassword})
  })
   if(res.status===201)
  {
    toast("Check your Email Inbox to verify Email")
    console.log("Registration Successful")
    // navigate("/login")
  }
  else if(res.status===422)
  {
    toast("Already Registered")
    console.log("Already Registered")

  }
  else{
    toast("Invalid Registration")
    console.log("Invalid Registration")
  }
}
}
}
const changeCountry=(value)=>
{
   setUser({...user, country:value})
  
}
  return (
    <>
    {/* <section className="vh-100" style={{backgroundColor: "#eee"}}></section> */}
      <section className="" style={{backgroundColor: "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100" >
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px",marginTop:"20px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form method='POST' autoComplete="on" className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" name="name" maxLength='24' value={user.name} onChange={handleInput} autoComplete="on"  id="form3Example1c" className="form-control" required={true} />
                      <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" required={true} maxLength='254' name="email"  value={user.email} onChange={handleInput}  autoComplete="on" id="form3Example2c" className="form-control" />
                      <label className="form-label" htmlFor="form3Example2c">Your Email</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                     <CountrySelector onChange={changeCountry} className="form-control"></CountrySelector>
                     <label className="form-label" htmlFor="form3Example2c">Your Country</label>
                     {/* <label className="form-label" htmlFor="form3Example3c">Your Phone number</label> */}
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="tel" name="phone" maxLength='20' value={user.phone} onChange={handleInput}  autoComplete="on" id="form3Example3c" className="form-control" />
                      <label className="form-label" htmlFor="form3Example3c">Your Phone number</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" name="work" maxLength='24' value={user.work}  autoComplete="on" onChange={handleInput} id="form3Example4c" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4c">Your Profession</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" name="password" placeholder='Min 8 characters' value={user.password}  autoComplete="on" onChange={handleInput} id="form3Example5c" className="form-control" />
                      <label className="form-label" htmlFor="form3Example5c">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" name="cpassword" placeholder='Min 8 characters' value={user.cpassword}  autoComplete="on" onChange={handleInput} id="form3Example4cd" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                     <label className="form-check-label" htmlFor="form2Example3">
                     By proceeding, you agree to all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" onClick={postData} className="btn btn-primary btn-lg">Register</button>
                    <ToastContainer/>
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
