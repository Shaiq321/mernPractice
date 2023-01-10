import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
export default function CategoryFilter({Category, onChangeCategory}) {
  //  const [category,setCategory]=useState()
  // useEffect(()=>{onChangeCategory(category)},[category])
  // const [state, setState] = useState({
  //   gilad: true,
  //   jason: false,
  //   antoine: false,
  // });
  
  const handleChange = (e) => {
    const name=e.target.name
    const value=e.target.checked
    onChangeCategory({...Category,[name]:value})
    // setState({
    //   ...state,
    //   [event.target.name]: event.target.checked,
    // });
  };
  return (

//  <FormControl  sx={{ m: 1, width: 200}}>
<>

      {/* <Box sx={{ display: 'flex' }}> */}
      <FormControl sx={{ m: 1}} component="fieldset" variant="standard">
     
      
        {/* <FormLabel component="legend">Category</FormLabel> */}
        
        
        <FormGroup sx={{display:'inline'}}>
        {/* <Row>
        <Col sm> */}
          <FormControlLabel
            control={
              <Checkbox checked={Category.FreePaid} onChange={handleChange} name="FreePaid" />
            }
            
            label="Free + Paid"
          />
          {/* </Col>
          <Col sm> */}
          <FormControlLabel
            control={
              <Checkbox checked={Category.FreeOnly} onChange={handleChange} name="FreeOnly" />
            }
            label="Free only"
          />
          {/* </Col>
          <Col sm> */}
          <FormControlLabel
            control={
              <Checkbox checked={Category.PaidOnly} onChange={handleChange} name="PaidOnly" />
            }
            label="Paid only"
          />
          {/* </Col>
          </Row> */}
        </FormGroup>
        
      </FormControl>  
      {/* </Row> */}
    {/* </Box> */}
      {/* <RadioGroup
        // row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={Category}
        name="radio-buttons-group"
        onChange={(e, value) => {
          onChangeCategory(value)
            // setCategory(value)
          }}
         sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}
      >
        <FormControlLabel value="FreePaid" control={<Radio />} label="Free + Paid" />
        <FormControlLabel value="Free only" control={<Radio />} label="Free only" />
        <FormControlLabel value="Paid only" control={<Radio />} label="Paid only" />
      </RadioGroup> */}
    {/* // </FormControl> */}
    </>
  )
}






// import React,{useEffect, useState} from 'react'
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// export default function CategoryFilter({Category, onChangeCategory}) {
//   //  const [category,setCategory]=useState()
//   // useEffect(()=>{onChangeCategory(category)},[category])
//   return (

// //  <FormControl  sx={{ m: 1, width: 200}}>
// <>
//       <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
//       <RadioGroup
//         // row
//         aria-labelledby="demo-radio-buttons-group-label"
//         defaultValue={Category}
//         name="radio-buttons-group"
//         onChange={(e, value) => {
//           onChangeCategory(value)
//             // setCategory(value)
//           }}
//          sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}
//       >
//         <FormControlLabel value="FreePaid" control={<Radio />} label="Free + Paid" />
//         <FormControlLabel value="Free only" control={<Radio />} label="Free only" />
//         <FormControlLabel value="Paid only" control={<Radio />} label="Paid only" />
//       </RadioGroup>
//     {/* // </FormControl> */}
//     </>
//   )
// }
