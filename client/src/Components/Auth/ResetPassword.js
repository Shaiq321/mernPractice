import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'; 
import validator from 'validator'
export default function ResetPassword() {
  const navigate=useNavigate()
  const [user,setUser]=useState({
    email:'',otp:'',
    password:'', cpassword:''
})

let name,value
const handleInput =(e)=>{
name=e.target.name
value=e.target.value
setUser({...user, [name]:value})
}
const resetMyPassword= async (e)=>{
  e.preventDefault()
  const {email,otp,password,cpassword}=user
  if(!email || !otp || !password || !cpassword)
  {
    toast('Fill All Fields')
  }
  else{
    if(password.length<8) {
      toast('Password invalid')
    }
    else if(otp.length!==6) {
      toast('Code invalid')
    }
     else if(!validator.equals(password,cpassword))
     {
         toast('Password is not same')
     }
     else {
      
  const res= await fetch('/resetMyPassword',{
    method: "POST",
    headers:{
      'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({email,otp,password})
  })
   if(res.status===201)
  {
    toast("Password changed")
    console.log("Password changed")
    navigate("/login")
  }
  else if(res.status===404)
  {
    toast("Invalid Email or Code")
    console.log("Code invalid or Email doesn't exist")
  }
  else{
    toast("Password doesn't change")
    console.log("Password doesn't change")
  }
}
}
}
const sendEmailOtp= async (e)=>{
        e.preventDefault()
        const {email}=user
        if(!email)
        {
          toast('Fill All Fields')
        }
        else if(!validator.isEmail(email)){
          toast('Email is invalid')
           }
        else {
        const res= await fetch(`/sendEmailOtp?email=${email}`,{
          method: "POST",
        })
        if(res.status===200)
        {
          //dispatch({type:"user",payload:true})
          toast('Email sent, Check you mail inbox')
          console.log("Email Sent")
        }
        else if (res.status===400){
            toast("Email doesn't exist")
          }
        else{
          console.log("data.status")
          toast('Server side problem')
          console.log("OTP problem")
        }
      }
      }
    return (
        <>
         {/* <section className="vh-100" style={{backgroundColor: "#eee"}}></section>  */}
         <section className="" style={{backgroundColor: "#eee"}}>
       <div className="container h-100">
         <div className="row d-flex justify-content-center align-items-center h-100" >
           <div className="col-lg-12 col-xl-11">
             <div className="card text-black" style={{borderRadius: "25px",marginTop:"20px"}}>
               <div className="card-body p-md-5">
                 <div className="row justify-content-center">
                   <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
     
                     <p className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-4">Reset Password</p>
     
                     <form method='POST' className="mx-1 mx-md-4">
                   <div className="d-flex flex-row align-items-center mb-4">
                         <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                         <div className="form-outline flex-fill mb-0" style={{position:'relative'}}>
                         <input type="email" name='email' value={user.email} onChange={handleInput} autoComplete="on" id="form3Example3c" className="form-control" />
                         <button type="button" onClick={sendEmailOtp} className="btn btn-secondary btn-md" style={{position: 'absolute',top:0,right:0}}>Send Code</button>
                         <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                         </div>
                       </div>
     
                       <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" required={true} name="otp"  value={user.otp} onChange={handleInput}  autoComplete="on" id="form3Example2c" className="form-control" />
                      <label className="form-label" htmlFor="form3Example2c">Enter Code</label>
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

                 

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" onClick={resetMyPassword} className="btn btn-primary btn-lg">Reset</button>
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
