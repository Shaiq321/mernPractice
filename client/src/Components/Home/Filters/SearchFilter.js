import React from 'react'
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import '../../../style.css'
export default function SearchFilter({searchByGrpName,onChange,onSearch}) {
    // let value
  return (
    <div  style={{position: 'relative'}}>
      
    <TextField
      id="search-bar"
      className="text"
      value={searchByGrpName}
      onInput={(e) => {
        // setSearchQuery(e.target.value);
        onChange(e.target.value)
        // value=e.target.value
        
      }}
      onKeyDown={(e)=>{ if (e.key === 'Enter'){onSearch(e);}}}
    //   label="Enter a city name"
    //   value={searchByGrpName}
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton style={{position: 'absolute',top:0,right:0}} onClick={(e)=>{onSearch(e); }} aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  
    </div>
  )
}
