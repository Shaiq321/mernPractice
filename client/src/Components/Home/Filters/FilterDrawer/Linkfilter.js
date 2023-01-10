import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const names = [
  'whatsapp',
  'telegram',
  'facebook',
  'twitter',
  'youtube',
  'instagram',
  'reddit'
];

function getStyles(name, linknames, theme) {
  return {
    fontWeight:
    linknames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Linkfilter({linknames, onChangeLinknames}) {
  const theme = useTheme();
  // const [linkNames, setLinkNames] = React.useState([linknames]);

  const handleChange = (event) => {
    const {target: { value },} = event;
    onChangeLinknames(typeof value === 'string' ? value.split(',') : value)
    // setLinkNames(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value
    // );
    
  };
  // React.useEffect(()=>{
  //   onChangeLinks(linkNames)
  // },[linkNames])

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-chip-label">Links</InputLabel>
        <Select
         
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
           multiple
         
          value={linknames}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Links" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      
              {selected.map((value) => (
                <Chip key={value} label={value} sx={{ backgroundColor:'rgb(214, 35, 100)', color:'white' }}/>
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, linknames, theme)}
              
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}