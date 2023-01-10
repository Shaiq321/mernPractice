import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "../../style.css"
export default function AdminHome({AdminDataSet,approved,onChangeApproved}) {
  const [unapprovedBGcolor,setUnapprovedBGcolor]=useState()
  const [approvedBGcolor,setApprovedBGcolor]=useState()
   const {countUsers,verifiedUsers,UnVerifiedUsers,countGrps,approvedGrps,unApprovedGrps}=AdminDataSet
   useEffect(()=>{
    if(approved)
    {
      setUnapprovedBGcolor();
      setApprovedBGcolor('#ffff00');
    }
    else
    {
    setApprovedBGcolor();
    setUnapprovedBGcolor('#ffff00');
    }
   },[approved])
   return ( 
   <>
   <div className="card-container">
   {/* <div className="card"> */}
   <Container className="container_homecard ">
    <Row className='adminHomeClassRow'>  
    <Col className='adminHomeClassCol'>
    <Row>
    <Col>
    <h2 className='card-title card-title-wrap'>Users: {countUsers}</h2>   
    </Col>  
    <Col >
    <h2 className='card-title card-title-wrap'>Verified: {verifiedUsers}</h2> 
    </Col>  
    <Col>  
    <h2  className='card-title card-title-wrap'>Unverified: {UnVerifiedUsers}</h2>   
    </Col>  
    </Row>
    </Col>
    <Col  className='adminHomeClassCol'> 
    <Row>
     <Col  >
    <h2 className='card-title card-title-wrap'>Groups: {countGrps}</h2> 
    </Col>  
    <Col style={{paddingLeft: '0px',paddingRight: '0px'}} > 
    <h2 style={{ margin:'0px', padding:'10px',backgroundColor:approvedBGcolor}}  onClick={(e)=>{onChangeApproved(true)}} className=' adminh2 card-title card-title-wrap'>Approved: {approvedGrps}</h2>
    </Col>  
    <Col style={{paddingLeft: '0px',paddingRight: '0px'}}> 
    <h2 style={{margin:'0px', padding:'10px', backgroundColor:unapprovedBGcolor}} onClick={(e)=>{onChangeApproved(false)}} className=' adminh2 card-title card-title-wrap'>UnApproved: {unApprovedGrps}</h2>      
     </Col>
     </Row>
     </Col>
    </Row>
   </Container>
   {/* </div> */}
   </div>
  </>
  )
}





    // const [grpsData,setGrpsData]=useState([])  
    // const [usersCount, setUsersCount]= useState()
    // const [verifiedUsersCount, setVerifiedUsersCount]= useState()
    // const [unverifiedUsersCount, setUnverifiedUsersCount]= useState()
    // const [grpsCount, setGrpsCount]= useState()
    // const [approvedGrpsCount, setApprovedGrpsCount]= useState()
    // const [unApprovedGrpsCount, setUnApprovedGrpsCount]= useState()
  // const callAdminPage=async (page)=>{
  //   try {
  //     const limit=4
  //     const skipLimit=limit*(page-1)
  //     const res= await fetch(`/getAdminData?page=${page}&limit=${limit}&skipLimit=${skipLimit}`,{
  //       method:"GET",
  //       headers:{
  //         'Accept': 'application/json',
  //         "Content-Type":"application/json"
  //       },
  //       credentials:"include"
  //     })
  //    let data= await res.json()
  //    let {homeData,dataForAdmin}=data
  //     let {countUsers,verifiedUsers,UnVerifiedUsers,countGrps,approvedGrps,unApprovedGrps}=dataForAdmin
  //      setGrpsData(homeData)
  //       setUsersCount(countUsers) 
  //       setVerifiedUsersCount(verifiedUsers)
  //       setUnverifiedUsersCount(UnVerifiedUsers)
  //       setGrpsCount(countGrps)   
  //       setApprovedGrpsCount(approvedGrps)
  //       setUnApprovedGrpsCount(unApprovedGrps)
  //       console.log(grpsData)
  //      if(res.status!==200)
  //     {
  //       const error= new Error(res.error)
  //       throw error
  //     }
  //   }
  //    catch (err) {
  //     console.log(err)
  //   }
  //     }
  //     useEffect(()=>{
  //       callAdminPage(1)
  //     },[])
