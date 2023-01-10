import React,{useEffect, useState} from 'react'
import StyledCategoryOptions from '../../../MyGroup/StyledCategoryOptions'
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
export default function SortFilter({sortByRating,onChangeSortByRating}) {
    const [anchorEl, setAnchorEl] = useState(null);
 
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
 
};
const handleClose = (event) => {
  setAnchorEl(null);
  const { myValue } = event.currentTarget.dataset;
  onChangeSortByRating(myValue)
  
};
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
{sortByRating? sortByRating:'Sort by'}
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
<MenuItem  data-my-value={"Sort by Rating"} onClick={handleClose} disableRipple>
Rating
</MenuItem>
</StyledCategoryOptions>
    </div>
  )
}


