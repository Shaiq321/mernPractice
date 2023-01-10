import React,{useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {toast, } from 'react-toastify';
const CryptoJS = require("crypto-js");
const SECRET_KEY=process.env.REACT_APP_SECRET_KEY
export default function Share({id}) {

    // console.log(SECRET_KEY)
    // const handleClickOpen = () => {
    //     // <a href=`http://localhost:3000/home/${id}` />
    //   };
      const [open, setOpen] =useState(false);
      const [ID,setID]=useState()
      const handleClickOpen = () => {
    id = CryptoJS.AES.encrypt(JSON.stringify(id), SECRET_KEY).toString();
    const Id=id.toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32');
    id=`http://localhost:3000/home/${Id}`
   
    setID(id)
// console.log("myid",id)
        setOpen(true);

      };
      const handleClose = () => {
        navigator.clipboard.writeText(ID);
        toast('Link Copied')
        setOpen(false);
      };

  return (
    <div>
        <Button variant="text" className='me-4' onClick={handleClickOpen}>Share</Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Shareable Link</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {ID}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Copy Link</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
