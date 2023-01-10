import React from 'react'
import { useState,useEffect } from 'react'
import '../style.css'
import {toast, ToastContainer} from 'react-toastify';
export default function Contact() {
    const [userData,setUserData]=useState({name:'', email:'', phone:'',message:''})
    const callContactData=async ()=>{
  try {
    const res= await fetch('/about',{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
    })
    const data= await res.json()
     setUserData({...userData, name:data.name,email:data.email,phone:data.phone})
    if(res.status!==200)
    {
      const error= new Error(res.error)
      throw error
    }
   
  } catch (err) {
    console.log(err)
  }
    }
    useEffect(()=>{
      callContactData()
    },[])
    const handleInputs= (e)=>{
        const name=e.target.name
        const value=e.target.value
       setUserData({...userData,[name]:value})
    }
    const contactForm=async (e)=>{
        e.preventDefault()
        const {name,email,phone,message}=userData
        if(!name || !email || !phone || !message)
        {
            toast('Fill data correctly')
        }
        else if(message.length<100)
        {
            toast('Message should contain minimum 100 characters')
        }
        else{

        const res=await fetch('/contact',{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({name,email,phone,message})
        })
        const data=res.json()
        if(res.status===201)
        {
            toast('message sent, Response will be sent on given Email')
         setUserData({...userData, message:""})
        }
        else
        {
        toast('message not sent')
        }
    }
}
  return (
 <>

<section className="mb-2 ms-4 me-4 about-container" >
    <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
    <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
        a matter of hours to help you.</p>

    <div className="row">

        <div className="col-md-9 mb-md-0 mb-5">
            <form id="contact-form" name="contact-form"  method="POST">


                <div className="row">

                    <div className="col-md-6">
                        <div className="md-form mb-0">
                            <input type="text" name="name" maxLength='24'  required={true} value={userData.name} onChange={handleInputs} id="name" className="form-control"/>
                            <label htmlFor="name" className="">Your name</label>
                        </div>
                    </div>
            
                    <div className="col-md-6">
                        <div className="md-form mb-0">
                            <input type="text" name="email" maxLength='256' required={true} value={userData.email} onChange={handleInputs} id="email"  className="form-control"/>
                            <label htmlFor="email" className="">Your email</label>
                        </div>
                    </div>
  
        </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="md-form mb-0">
                            <input type="text" maxLength='20'  name="phone" required={true} value={userData.phone} onChange={handleInputs} id="phone" className="form-control"/>
                            <label htmlFor="phone" className="">Phone</label>
                        </div>
                    </div>
                </div>
      
                <div className="row">

                    <div className="col-md-12">

                        <div className="md-form">
                            <textarea type="text" placeholder="min 100, max 500 characters" minLength='100' maxLength='500' name="message" value={userData.message} required={true} onChange={handleInputs} id="message"  rows="2" className="form-control md-textarea"></textarea>
                            <label htmlFor="message">Your message</label>
                        </div>

                    </div>
                </div>

            <div className="text-center text-md-left">
                <a className="btn btn-primary" onClick={contactForm} >Send</a>
                <ToastContainer/>
            </div>
            <div className="status"></div>
</form>
        </div>

        <div className="col-md-3 text-center">
            <ul className="list-unstyled mb-0">
                <li><i className="fas fa-map-marker-alt fa-2x"></i>
                    <p>Johar Town, Lahore, Pakistan</p>
                </li>

                <li><i className="fas fa-phone mt-4 fa-2x"></i>
                    <p>+923039363659</p>
                </li>

                <li><i className="fas fa-envelope mt-4 fa-2x"></i>
                    <p>shaiqonwork@gmail.com</p>
                </li>
            </ul>
        </div>
      

    </div>

</section>

 </>
  )
}
