import React, {useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function DeleteGrpPopup({grpMsgopen,otpOnChange,handlePopUp}) {
    const [OTP,setOTP]= useState()
    const handleGrpMsgClose = () => {
      otpOnChange(OTP)
      
    };
    const handleGrpMsgOpen = () => {
      handlePopUp()
    };
  
  return (
      <Dialog
open={grpMsgopen}
TransitionComponent={Transition}
keepMounted
onClose={handleGrpMsgClose}
aria-describedby="alert-dialog-slide-description"
>
<DialogTitle>{"Notification"}</DialogTitle>
 <DialogContent>
  <DialogContentText id="alert-dialog-slide-description">
  <div className="d-flex flex-row align-items-center mb-4">
  Confirmation code sent to your registered email. Enter code below to delete your group permanently.
                  </div>

  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" required={true} name="otp"  value={OTP} onChange={(e)=>{setOTP(e.target.value)}}  autoComplete="on" id="form3Example2c" className="form-control" />
                      <label className="form-label" htmlFor="form3Example2c">Enter Code</label>
                    </div>
                  </div>
  </DialogContentText>
</DialogContent>
<DialogActions>
<Button onClick={handleGrpMsgOpen}>Cancel</Button>
  <Button onClick={handleGrpMsgClose}>OK</Button>
</DialogActions> 

</Dialog>

  )
}


