import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/tab'
// import validator from 'validator'
// import {toast, ToastContainer} from 'react-toastify';
// import StyledCategoryOptions from './StyledCategoryOptions'
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VerifiedIcon from '@mui/icons-material/Verified';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MyProfileTab from './MyProfileTab'
import ManageGrpTab from './ManageGrpTab'
import Socialicons from '../Socialicons'
import RatingCalculator from '../Home/RatingCalculator'
export default function About() {
  const navigate=useNavigate()
  const [userData,setUserData]=useState({groups: {links: {}}})
  const [grpData,setGrpData]=useState({name:'', desc:'', category:'Free + Paid', img:'',whatsapp:'',telegram:'',facebook:'',twitter:'',youtube:'',
                     instagram:'',reddit:''})
  const [isUpdateBtn,setIsUpdateBtn]=useState('Add Group')
  const [isDeleteBtn,setIsDeleteBtn]=useState(true)
  const callAboutPage=async ()=>{
try {
  const res= await fetch('/about',{
    method:"GET",
    headers:{
      Accept: "application/json",
      "Content-Type":"application/json"
    },
    credentials:"include"
  })
  const data= await res.json()
  const {name,email,country,phone,work}=data
   
   if(data.groups.name)
   {
    setUserData(data)
   const {whatsapp,telegram,facebook,twitter,youtube,instagram,reddit}=data.groups.links
   setGrpData({...grpData,name:data.groups.name,desc:data.groups.desc,category:data.groups.category,
    whatsapp:whatsapp,telegram:telegram,facebook:facebook,
    twitter:twitter,youtube:youtube,instagram:instagram,reddit:reddit})
    setIsUpdateBtn('Update Group')
    setIsDeleteBtn(false)
  }
  else
  {
    setUserData({...userData,name,email,country,phone,work,groups:{name:'',desc:'',category:'',img:'',links:{whatsapp:'',telegram:'',facebook:'',twitter:'',youtube:'',
    instagram:'',reddit:''}}})
    setIsUpdateBtn('Add Group')
    setIsDeleteBtn(true)
  }
  if(res.status!==200)
  {
    const error= new Error(res.error)
    throw error
  }
 
} catch (err) {
  console.log(err)
  navigate('/login')
}
  }
  useEffect(()=>{
    callAboutPage()
  },[])


  const calculateRating=(reviews)=>
  {
    if(reviews.length!==0)
    {
    const {reviewee_rating}=RatingCalculator(reviews) 
    return reviewee_rating
    }
    else return "Not rated yet"
    
  }

 
function onChangeGrpData(newValue) {
  setGrpData(newValue)
}
function onChangeIsUpdateBtn(newValue) {
    setIsUpdateBtn(newValue)
}
function onChangeIsDeleteBtn(newValue) {
  setIsDeleteBtn(newValue)
}


  return (
  <>
   
<Container className='about-container'>

      <Row>
        <Col sm='2'>
        {grpData.img ? (
        <div className='text-end'>
        <img alt='No logo'  width='100%' height='auto' className='about_img_logo_responsive' src={URL.createObjectURL(grpData.img)} />
        <br />
        <button onClick={()=>setGrpData({...grpData,img:''})}>Remove</button>
        </div>
      ):(
        <div className='text-end'>
        <img alt='No logo'  width='100%' height='auto' className='about_img_log_responsive' src={userData.groups.img} />
       </div>
      )
      }
        </Col>
        <Col sm='10'>
   
          <Row>
            <Col>
            <h5>{userData.name}</h5>
            {userData.groups.reviews? 
            (  <p>Rating: {calculateRating(userData.groups.reviews)}</p>  )
            :null} 
           
            </Col>
            <Col className="aboutGrpApproveNotify">
            {userData.groups.approved? (<h5>Group Approved <VerifiedIcon color="primary"/></h5>)
            : 
            (<h5>Waiting for Approval <WatchLaterIcon /></h5>)}
            </Col>
          </Row>
              
          <Tabs defaultActiveKey='about'  className='mb-3'>
          <Tab eventKey='about' title='My Profile' >
           <MyProfileTab userData={userData}></MyProfileTab>
          </Tab>
          <Tab eventKey='Groups-Info' title='Manage Group'>
        
          <ManageGrpTab grpData={grpData} userData={userData} isUpdateBtn={isUpdateBtn}
                        isDeleteBtn={isDeleteBtn} onChangeGrpData={onChangeGrpData} onChangeIsUpdateBtn={onChangeIsUpdateBtn}
                        onChangeIsDeleteBtn={onChangeIsDeleteBtn}
                        />
          </Tab>        
          </Tabs>
        </Col>
      </Row>
      <Row>
        <Col sm className='text-center'>
        <Socialicons data={userData}></Socialicons>
        </Col>
      </Row>
      
    </Container>

    </>
  )
}

