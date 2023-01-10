import React,{useState,useContext} from 'react'
import StyledCategoryOptions from './StyledCategoryOptions'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddUpdateGrpPopup from './AddUpdateGrpPopup'
import DeleteGrpPopup from './DeleteGrpPopup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import validator from 'validator'
import {toast, ToastContainer} from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import {userDataContext} from '../../App'
export default function ManageGrpTab({grpData,userData,isUpdateBtn,isDeleteBtn,onChangeGrpData,onChangeIsUpdateBtn,onChangeIsDeleteBtn}) {
  console.log("grpdata"+grpData.name)
  const navigate=useNavigate()
  const {email}= useContext(userDataContext)
  
  const [AddUpdateGrpPopupOpen, setAddUpdateGrpPopupOpen] = useState(false);
  const [deleteGrpPopupOpen, setDeleteGrpPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
   
  };
  const handleClose = (event) => {
    setAnchorEl(null);
    const { myValue } = event.currentTarget.dataset;
    onChangeGrpData({...grpData,category:myValue})
    // setGrpData({...grpData,category:myValue})
  };
  const handleInputs= (e)=>{
    const name=e.target.name
    let value
    if(name==='img')
    {
       value=validateImg(e.target.files[0])
    }
    else  value=e.target.value
    onChangeGrpData({...grpData,[name]:value})
    // setGrpData({...grpData,[name]:value})
    }
    const validateImg=(value)=>{
      const fileSizeKiloBytes = value.size / 1024
      if (!value.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
       toast('select valid image.');
       return '';
       }
       else if(fileSizeKiloBytes > 500){
         toast("File size is greater than maximum limit: 500kb");
         return '';
       }
       else return value
    }
  const addGrp =async (e)=>{
   
    e.preventDefault()
    const {name,desc,category,img,whatsapp,telegram,facebook,twitter,youtube,
    instagram,reddit}=grpData  
    if(!name || !desc || !category)
    {
      toast("Name,Desc and category required")
    }
    else if (!img && !userData.groups.img){
      toast("image required")
    }
    else{
      if(desc.length<100)
      {
        toast("Description: Minimum 100 characters required")
      }
      else if(!whatsapp && !telegram && !facebook && !twitter && !youtube && !instagram && !reddit)
      {
        toast("atleast one Group Link required")
      }
      else if( (whatsapp && !validator.isURL(whatsapp)) || 
               (telegram && !validator.isURL(telegram)) || 
               (facebook && !validator.isURL(facebook)) ||
               (twitter && !validator.isURL(twitter)) || 
               (youtube && !validator.isURL(youtube)) || 
               (reddit && !validator.isURL(reddit)))
      {
        toast("Check some Links invalid")
      }
      else{
    const formData= new FormData()
    formData.append('name',name)
    formData.append('desc',desc)
    formData.append('category',category)
    formData.append('img',img)
    formData.append('facebook',facebook)
    formData.append('instagram',instagram)
    formData.append('reddit',reddit)
    formData.append('telegram',telegram)
    formData.append('twitter',twitter) 
    formData.append('whatsapp',whatsapp)
    formData.append('youtube',youtube)   
    const res=await fetch('/addGrp',{
    method:"POST",
    body: formData
    })
    if(res.status===201)
    {
     onChangeIsUpdateBtn('Update Group')
    //  setIsUpdateBtn('Update Group')
    onChangeIsDeleteBtn(true)
    //  setIsDeleteBtn(true)
    onChangeGrpData({...grpData,name:'',desc:'',category:'',img:'',whatsapp:'',telegram:'',facebook:'',twitter:'',youtube:'',
     instagram:'',reddit:''})
    //  setGrpData({...grpData,name:'',desc:'',category:'',img:'',whatsapp:'',telegram:'',facebook:'',twitter:'',youtube:'',
    //  instagram:'',reddit:''})
     console.log(res)
     setAddUpdateGrpPopupOpen(true);
  
    }
    else
    {
    toast('Failed : Group Not Added')
    }
}

      }
    }
 const deleteGrp =async (otp)=>{  
      if(grpData.name)
{
  if(!otp)
  {
    toast('Enter OTP, check Email Inbox')
  }
  else if(otp.length!==6) {
    toast('Code invalid')
  }
  else{  
      const res=await fetch(`/deleteGrp?email=${email}&otp=${otp}`,{
      method:"POST"
      })
      if(res.status===201)
      {
        onChangeGrpData({...grpData,name:'',desc:'',category:'',img:'',whatsapp:'',telegram:'',facebook:'',twitter:'',youtube:'',
         instagram:'',reddit:''})
      //  setGrpData({...grpData,name:'',desc:'',category:'',img:'',whatsapp:'',telegram:'',facebook:'',twitter:'',youtube:'',
      //  instagram:'',reddit:''})
       onChangeIsUpdateBtn('Add Group')
       onChangeIsDeleteBtn(true)
       navigate('/')
       toast('Group deleted')
       setDeleteGrpPopupOpen(false)
       console.log(res)  
      }
      else
      {
      toast('OTP invalid, Group Not deleted ')
      }
  }
}
    else 
    {
      toast('Group does not exist')
    }
  }
  const sendEmailOtp= async (e)=>{
    e.preventDefault()
    if(!email)
    {
      toast('Email not found')
    }
    else {
    const res= await fetch(`/sendEmailOtp?email=${email}`,{
      method: "POST",
    })
    if(res.status===200)
    {
      //dispatch({type:"user",payload:true})
      toast('Email sent, Check you mail inbox')
      setDeleteGrpPopupOpen(true);
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
  const handleOtp=(otp)=>{
    deleteGrp(otp)
    
  }
  const handlePopUp=()=>{
    setDeleteGrpPopupOpen(false)
  }
  return (
    <>
      <form id="contact-form" encType="multipart/form-data" name="contact-form"  method="POST" autoComplete="on">
      <Row>
      <Col>
      <Row >
        <Col sm='4'><p>Group Name</p></Col> 
        <Col sm='8'><p className='about-text-color'> 
        <input type="text" name="name" placeholder='required' maxLength='24' required={true} value={grpData.name} onChange={handleInputs} id="name" className="form-control" autoComplete="on"/>
         </p></Col></Row>
        <Row><Col sm='4'><p>Category</p></Col>
        <Col sm='8'><p  className='about-text-color'> 
        <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
      {grpData.category}
      </Button>
      <StyledCategoryOptions
      
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem  data-my-value={"Free + Paid"} onClick={handleClose} disableRipple>
        Free + Paid
        </MenuItem>
        <MenuItem data-my-value={"Free only"} onClick={handleClose} disableRipple>
        Free only
        </MenuItem>
        <MenuItem data-my-value={"Paid only"} onClick={handleClose} disableRipple>
        Paid only
        </MenuItem>
      </StyledCategoryOptions>
            </p></Col></Row>  
            <Row><Col sm='4'><p>Description</p></Col>
             <Col sm='8'><p  className='about-text-color'>  
              <textarea rows="2" cols="200" style={{height:'210px'}} minLength='100' maxLength="150" placeholder='required, Min 100 Max 150' height="250px"  name="desc" required={true} value={grpData.desc} onChange={handleInputs} id="desc"  className="form-control" autoComplete="on"/>
                         </p></Col></Row>  
            <Row><Col sm='4'><p>Image</p></Col>
             <Col sm='8'><p  className='about-text-color'>  
              <input type="file" name="img" placeholder='required' required={true} onChange={handleInputs} id="img"  className="form-control" autoComplete="on"/>
              <ToastContainer>Max file size 500kb</ToastContainer>
                         </p></Col></Row>  
           </Col>
           <Col sm>
              <Row>
              <Col sm className='text-center text-danger'><p>Enter Group links below, Atleast one link required</p></Col>
             </Row>  
             
            <Row><Col sm='4'><p>WhatsApp</p></Col>
             <Col sm='8'><p  className='about-text-color'>  
              <input type="text" name="whatsapp"  value={grpData.whatsapp} onChange={handleInputs} id="whatsapp"  className="form-control" autoComplete="on"/>
             </p></Col>
             </Row>  
             <Row><Col sm='4'><p>Telegram</p></Col>
             <Col sm='8'><p  className='about-text-color'>  
              <input type="text" name="telegram"  value={grpData.telegram} onChange={handleInputs} id="telegram"  className="form-control" autoComplete="on"/>
             </p></Col>
             </Row>  
             <Row><Col sm='4'><p>Facebook</p></Col>
             <Col sm='8'><p  className='about-text-color'>  
              <input type="text" name="facebook"  value={grpData.facebook} onChange={handleInputs} id="facebook"  className="form-control" autoComplete="on"/>
             </p></Col>
             </Row>  
             <Row><Col sm='4'><p>Twitter</p></Col>
             <Col sm='8'><p  className='about-text-color'>  
              <input type="text" name="twitter"  value={grpData.twitter} onChange={handleInputs} id="twitter"  className="form-control" autoComplete="on"/>
             </p></Col>
             </Row>  
             <Row><Col sm='4'><p>Youtube</p></Col>
             <Col sm='8'><p  className='about-text-color'>  
              <input type="text" name="youtube"  value={grpData.youtube} onChange={handleInputs} id="youtube"  className="form-control" autoComplete="on"/>
             </p></Col>
             </Row>  
             <Row><Col sm='4'><p>Instagram</p></Col>
             <Col sm='8'><p  className='about-text-color'>  
              <input type="text" name="instagram"  value={grpData.instagram} onChange={handleInputs} id="instagram"  className="form-control" autoComplete="on"/>
             </p></Col>
             </Row>  
             <Row><Col sm='4'><p>Reddit</p></Col>
             <Col sm='8'><p  className='about-text-color'>  
              <input type="text" name="reddit"  value={grpData.reddit} onChange={handleInputs} id="reddit"  className="form-control" autoComplete="on"/>
             </p></Col>
             </Row>
             </Col>
             </Row>  
             <Row className='text-end button'>
             
             <Col sm> 
             <Button variant="outlined" className=' me-4 mb-2' onClick={addGrp}>{isUpdateBtn}</Button>
             <Button variant="outlined" className='me-4  mb-2' disabled={isDeleteBtn}  onClick={sendEmailOtp}>Delete Group</Button>
             <AddUpdateGrpPopup grpMsgopen={AddUpdateGrpPopupOpen}/>
             <DeleteGrpPopup grpMsgopen={deleteGrpPopupOpen} otpOnChange={handleOtp} handlePopUp={handlePopUp}/>
            
            
             </Col>
            
             </Row>  
           
           
            </form>
    </>
  )
}
