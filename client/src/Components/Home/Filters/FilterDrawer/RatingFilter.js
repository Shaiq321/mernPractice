import React,{useEffect, useState} from 'react'
import StyledCategoryOptions from '../../../MyGroup/StyledCategoryOptions'
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
export default function RatingFilter({Rating,onChangeRating}) {
    const [anchorEl, setAnchorEl] = useState(null);
    // const [rating, setRating] = React.useState("Rating");
 
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
 
};
const handleClose = (event) => {
  setAnchorEl(null);
  const { myValue } = event.currentTarget.dataset;
  // onChangeGrpData({...grpData,category:myValue})
  // setGrpData({...grpData,category:myValue})
  onChangeRating(myValue)
  
};
// useEffect(()=>{onChangeRating(rating)},[rating])
  return (
    <div>
      


<Button
 sx={{ textTransform: 'capitalize' ,  m: 1, width: 200}}
id="demo-customized-button"
aria-controls={open ? 'demo-customized-menu' : undefined}
aria-haspopup="true"
aria-expanded={open ? 'true' : undefined}
variant="outlined"
disableElevation
onClick={handleClick}
endIcon={<KeyboardArrowDownIcon />}
>
{Rating? Rating:'Rating'}
{/* {grpData.category} */}
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
<MenuItem  data-my-value={"4.5"} onClick={handleClose} disableRipple>
4.5 and up
</MenuItem>
<MenuItem data-my-value={"4.0"} onClick={handleClose} disableRipple>
4.0 and up
</MenuItem>
<MenuItem data-my-value={"3.5"} onClick={handleClose} disableRipple>
3.5 and up
</MenuItem>
<MenuItem  data-my-value={"3.0"} onClick={handleClose} disableRipple>
3.0 and up
</MenuItem>
<MenuItem data-my-value={"2.5"} onClick={handleClose} disableRipple>
2.5 and up
</MenuItem>
<MenuItem data-my-value={"2.0"} onClick={handleClose} disableRipple>
2.0 and up
</MenuItem>
</StyledCategoryOptions>
{/* <StyledCategoryOptions
id="demo-customized-menu"
MenuListProps={{
'aria-labelledby': 'demo-customized-button',
}}
anchorEl={anchorEl}
open={open}
onClose={handleClose}
>
<MenuItem  data-my-value={"4.5+ rating"} onClick={handleClose} disableRipple>
4.5 and up
</MenuItem>
<MenuItem data-my-value={"4.0+ rating"} onClick={handleClose} disableRipple>
4.0 and up
</MenuItem>
<MenuItem data-my-value={"3.5+ rating"} onClick={handleClose} disableRipple>
3.5 and up
</MenuItem>
<MenuItem  data-my-value={"3.0+ rating"} onClick={handleClose} disableRipple>
3.0 and up
</MenuItem>
<MenuItem data-my-value={"2.5+ rating"} onClick={handleClose} disableRipple>
2.5 and up
</MenuItem>
<MenuItem data-my-value={"2.0+ rating"} onClick={handleClose} disableRipple>
2.0 and up
</MenuItem>
</StyledCategoryOptions> */}
    </div>
  )
}


