import React,{useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HoverRating from './HoverRating'
import Report from './Report'
import "../../style.css"
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import {useNavigate } from 'react-router-dom'
import Socialicons from '../Socialicons'
import RatingCalculator from './RatingCalculator'
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Share from './Share'
const options = [
  'Report'
];

const ITEM_HEIGHT = 48;
export default function HomeCard({grpData,admin,onChange,approved}) {
  const navigate=useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [report,setReport]=useState(false)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
    console.log(event.target.value);
    if(event.target.value===0)
    {
    setReport(true)
    }
  };
  let id=0  
  const disApproveGrp =async (_id)=>{
    const res= await fetch(`/disApproveGrp?id=${_id}`,{
    method:"POST"
    })
    if(res.status===200)
    {
    //  navigate("/")
   
    toast('DisApproved',{position: toast.POSITION.BOTTOM_RIGHT})
     console.log(res)
     onChange();
    }
    else
    {
    toast('DisApproval Failed')
    }
  }
  
    const approveGrp =async (_id)=>{
    const res= await fetch(`/approveGrp?id=${_id}`,{
    method:"POST"
    })
    if(res.status===200)
    {
    //  navigate("/")
    onChange();
    toast('Approved',{position: toast.POSITION.BOTTOM_RIGHT})
     console.log(res)
 
    }
    else
    {
    toast('Approval Failed')
    }
  } 
  return (
    <>
    <section className='main-card--cointainer'>
    {
      
      grpData.map((curElem)=>{
      const {_id,groups}=curElem
      const {rating_calculated,reviews,links}=groups
      let reviewee_rating=0
      const data=RatingCalculator(reviews) 
      let rating_items_count=reviews.length
      reviewee_rating=rating_calculated
      {/* reviewee_rating=data.reviewee_rating */}
          if(typeof(groups.name)!=='undefined')
           {
            id++    
  
        return (
        <div className="card-container" key={id}>
<div className="card">
<Container className="container_homecard ">
    <Row>
      <Col >
    <span className='card-number card-circle subtle'>{id}</span>
    <span className='card-category subtle'>{groups.category}</span>
    <h2 className='card-title'>{groups.name}</h2>
    <Socialicons data={curElem}></Socialicons>
     </Col>
      
      <Col> 
    <img src={groups.img} alt="No Logo"  className="card-media"/>
    </Col>
    <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{position:'absolute',top:0,right:0, width:'50px'}}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
      {/* selected={option === 'Pyxis'} */}
        {options.map((option) => (
          <MenuItem key={option} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Row>
  <Row>
  <Col sm>
    <p className='card-description subtle'>
    {groups.desc}
     </p>
   
    </Col>
</Row>
<Row className='rating'>
{admin==="admin"? 
(
  
  <Col >
  {approved? <Button onClick={(e)=>{disApproveGrp(_id)}}>DisApprove</Button> 
  : 
  <Button onClick={(e)=>{approveGrp(_id)}}>Approve</Button>
  }
    
  </Col>  

)
:
(
  <>
  <Col >
  {report? 
  <div>
  <Report report={report} onChange={(v)=>{setReport(v)}} reportee_id={_id}></Report>
  </div>
  :null} 
<Share id={_id}></Share>
    </Col>  
  <Col  >
  <HoverRating reviewee_id={_id} reviewee_rating={reviewee_rating} reviews_count={rating_items_count} onChange={onChange}/>    
    </Col>    
</>
) 

}
</Row>
  
</Container>
    
</div>
</div>
        )
        }
        }
      )
    }
    </section>
    </>
)
}
