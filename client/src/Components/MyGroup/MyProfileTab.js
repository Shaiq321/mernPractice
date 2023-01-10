import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function MyProfileTab({userData}) {
  return (
    <>  
    <Row><Col sm><p>Name</p></Col> <Col sm><p  className='about-text-color'>
    {userData.name}
    </p></Col></Row>
    <Row><Col sm><p>Email</p></Col> <Col sm><p  className='about-text-color'>
    {userData.email}
    </p></Col></Row>
    <Row><Col sm><p>Country</p></Col> <Col sm><p className='about-text-color'>
    {userData.country}
    </p></Col></Row>
    <Row><Col sm><p>Phone</p></Col> <Col sm><p className='about-text-color'>
    {userData.phone}
    </p></Col></Row>
    <Row><Col sm><p>Profession</p></Col> <Col sm><p className='about-text-color'>
    {userData.work}
    </p></Col></Row>
    <br/>
    <Row><Col sm><p>Grp Name</p></Col> <Col sm><p  className='about-text-color'>
    {userData.groups.name}
    </p></Col></Row>
    <Row><Col sm ><p>Category</p></Col> <Col sm><p  className='about-text-color'>
    {userData.groups.category}
    </p></Col></Row>
    <Row><Col sm ><p>Description</p></Col> <Col sm><p  className='about-text-color about_desc'>
    {userData.groups.desc}
    </p></Col></Row>
    </>
  )
}
