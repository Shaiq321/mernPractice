import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import {useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
let value
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating(props) {
  //  const [value, setValue] = React.useState(props.reviewee_rating);
  value =props.reviewee_rating
  getLabelText(value)
  const [hover, setHover] = React.useState(-1);
  const navigate=useNavigate()
 
  // const addRating =async (reviewer_rating)=>{
    
  //   console.log(reviewer_rating)
  //   const res= await fetch(`/addRating?reviewee_id=${props.reviewee_id}&reviewee_rating=${props.reviewee_rating}&reviewer_rating=${reviewer_rating}`,{
  //     method:"POST",
  //     // headers:{
  //     //   'Accept': 'application/json',
  //     //   "Content-Type":"application/json"
  //     // },
  //     // credentials:"include"
  //   })
  
  //   if(res.status===200)
  //   {
  //       toast('Your old Rating Updated')
  //    console.log(res)

  //    props.onChange();

  //   }
  //   else if(res.status===201)
  //   {
  //       toast('New Rating Added')
  //    console.log(res)
  //    props.onChange();
  
  //   }
  //   else if(res.status===403)
  //   {
  //     toast("you can't review yourself")
  //   }
  //   else if(res.status===404)
  //   {
  //     toast("Data not found, Rating Failed")
  //   }
  //   else
  //   {
  //   navigate('/login')
  //   }
  // }
  // React.useEffect(()=>{ addRating(null)},[])
  const addRating =async (reviewer_rating)=>{
    const formData= new FormData()
    formData.append('reviewee_id',props.reviewee_id)
    formData.append('reviewer_rating',reviewer_rating)  
    const res=await fetch('/addRating',{
    method:"POST",
    body: formData
    })
    if(res.status===200)
    {
        toast('Your old Rating Updated')
     console.log(res)

     props.onChange();

    }
    else if(res.status===201)
    {
        toast('New Rating Added')
     console.log(res)
     props.onChange();
  
    }
    else if(res.status===403)
    {
      toast("you can't review yourself")
    }
    else if(res.status===404)
    {
      toast("Data not found, Rating Failed")
    }
    else
    {
    navigate('/login')
    }
  }
  return (
    <div  >
    <Box sx={{ mr: 2 }}>
        </Box>
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
        ml: 'auto'
    
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          value=newValue;
          addRating(newValue)
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
       
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <>
        <Box sx={{ ml: 1, color:'172B4D', bgcolor:'#DFE1E6',px:'6px',py:'2px', borderRadius:'8px' }}> 
        {props.reviews_count}
        </Box>
        <Box sx={{ ml: 1}}> 
        {labels[hover !== -1 ? hover : value]}
        </Box>
        </>
      )}
    </Box>
    </div>
  );
}
