import React,{useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import "../../style.css"
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
export default function Report({report,onChange,reportee_id}) {
    const navigate=useNavigate()
    const [reportDesc,setReportDesc]=useState()
    // const [open, setOpen] =useState(report);
    const handleClickOpen = () => {
      onChange(true);
    };
    const handleClose = () => {
      onChange(false);
    };
    const addReport =async ()=>{
      if(!reportDesc)
      {
        toast('Report Desciption is empty')
      }
      else if(reportDesc.length<100)
      {
        toast('Minimum 100 characters required')
      }
      else{
     
      const formData= new FormData()
      formData.append('reportee_id',reportee_id.valueOf())
      formData.append('report_desc',reportDesc)  
      const res=await fetch('/addReport',{
      method:"POST",
      body: formData
      })
      if(res.status===201)
      {
       toast('Reported')
       console.log(res)
       onChange(false);
       navigate('/');
      }
      else if(res.status===403)
      {
        toast("you can't report yourself")
      }
      else
      {
      toast('Reporting Failed')
      navigate('/login')
      }
    }
    }
    useEffect(()=>{handleClickOpen()},[report])
  return (
    <div>
        {/* <Button variant="text" className='me-4' onClick={handleClickOpen}>Report</Button> */}
  <Dialog open={report} onClose={handleClose}>
        <DialogTitle>Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Please write your report description here.
          </DialogContentText>
      
          <TextField
            autoFocus
            margin="dense"
            id="report_desc"
            label="Report Description"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
         
            onChange={(e)=>{setReportDesc(e.target.value)}}
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addReport}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
