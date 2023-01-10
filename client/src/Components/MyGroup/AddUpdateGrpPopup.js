import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useNavigate} from 'react-router-dom'
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function AddUpdateGrpPopup({grpMsgopen}) {
    const navigate=useNavigate()
    const handleGrpMsgClose = () => {
       navigate('/');
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
  Your group is submitted for approval, 
  You will get notified on registered Email in 1-3 working Days
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Button onClick={handleGrpMsgClose}>OK</Button>
</DialogActions>

</Dialog>

  )
}


