import React, {useState,useEffect,useContext} from 'react'
import HomeCard from './HomeCard'
import {toast, ToastContainer} from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularIndeterminate from './CircularIndeterminate'
import "../../style.css"
import AdminHome from './AdminHome'
import {userContext} from '../../App'
import FilterDrawer from './Filters/FilterDrawer/FilterDrawer';
import SearchFilter from './Filters/SearchFilter';
import { useParams } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import TickerTape from "./TickerTape";
// import { TickerTape } from "react-ts-tradingview-widgets";
const CryptoJS = require("crypto-js");
const SECRET_KEY=process.env.REACT_APP_SECRET_KEY

export default function Home() {
  let { id } = useParams()
  const {state}= useContext(userContext)
  const [adminState,setAdminState]=useState(state)
  const [userData,setUserData]=useState([])  
  const [pagesCount, setPagesCount]= useState()
  const [DataForAdmin, setDataForAdmin]= useState()
  const [filterResult,setFilterStatus]=useState(false)
  const [approvedState,setApprovedState] =useState(true)
  const [Category,setCategory]=useState({FreePaid:false,FreeOnly:false,PaidOnly:false})
  const [linknames,setLinknames]=useState([])
  const [Rating,setRating]=useState()
  const [searchByGrpName,setSearchByGrpName]=useState()
  const [sortByRating,setSortByRating]=useState()
  const [openFilter,setOpenFilter]=useState(false)
  const [onsearch,setOnsearch]=useState(false)

  const limit=6
  const calculatePages=(totalGrps)=>{
    totalGrps=parseInt(totalGrps)
    const pages=Math.ceil(totalGrps/limit)
     return pages
  }
  const callHomePage=async (page)=>{
try {
  const skipLimit=limit*(page-1)
  const res= await fetch(`/getGrpData?id=${id}&page=${page}&limit=${limit}&skipLimit=${skipLimit}
  &admin=${state}&approved=${approvedState}
  &category=${JSON.stringify(Category)}&links=${linknames}&rating=${Rating}&searchByGrpName=${searchByGrpName}&sortByRating=${sortByRating}`,
  {
    method:"GET",
    headers:{
      'Accept': 'application/json',
      "Content-Type":"application/json"
    },
    credentials:"include"
  })
  if(res.status===200)
  {
    setFilterStatus(true)
  }
  const data= await res.json()
  let {homeData,countGrps,dataForAdmin}=data
  
  setUserData(homeData) 
  console.log(homeData)
  if(countGrps)
  {
    const pages=calculatePages(countGrps)
    setPagesCount(pages)
  }
  else if(dataForAdmin)
  {
    let pages
    if(approvedState===true)
    {
      pages=calculatePages(dataForAdmin.approvedGrps)
    }
    else {
      pages=calculatePages(dataForAdmin.unApprovedGrps)
    }
    setPagesCount(pages)
    setDataForAdmin(dataForAdmin)
  }

   if(res.status!==200)
  {
    const error= new Error(res.error)
    throw error
  }
 
} catch (err) {
  console.log(err)
  toast(err)
}
  }

  useEffect(()=>{

    if(state!==null)
    {
      if(id){
        id=id.toString().replace('xMl3Jk', '+' ).replace('Por21Ld', '/').replace('Ml32', '=');
        const bytes = CryptoJS.AES.decrypt(id, SECRET_KEY);
        id = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
    callHomePage(1)
    }
    setAdminState(state)
  },[state,approvedState,onsearch,openFilter])


  function handleChange() {
    callHomePage(1)
  }
  const clearFilter=(e)=> {
      setCategory({FreePaid:false,FreeOnly:false,PaidOnly:false})
      setLinknames([])
      setRating('')
      setSortByRating('')
      setSearchByGrpName('')
    
    setOpenFilter(e)
  }
  const TickerTapeSymbol=[
    {
      "proName": "BINANCE:BTCUSDT",
      "title": "BTC/USDT"
    },
    {
      "proName": "BITSTAMP:ETHUSDT",
      "title": "ETH/USDT"
    },
    {
      "proName": "BINANCE:BNBUSDT",
      "title": "BNB/USDT"
    },
    {
      "proName": "BINANCE:XRPUSDT",
      "title": "XRP/USDT"
    },
    {
      "proName": "BINANCE:DOGEUSDT",
      "title": "DOGE/USDT"
    },
    {
      "proName": "BINANCE:DOTUSDT",
      "title": "DOT/USDT"
    },
    {
      "proName": "BINANCE:LTCUSDT",
      "title": "LTC/USDT"
    },
    {
      "proName": "BINANCE:TRXUSDT",
      "title": "TRX/USDT"
    },
    {
      "proName": "BINANCE:SHIBUSDT",
      "title": "SHIB/USDT"
    },
    {
      "proName": "BINANCE:UNIUSDT",
      "title": "UNI/USDT"
    }
  ]
return (
<>
{/* <TickerTape ></TickerTape>   */}
    {/* <TickerTape colorTheme="dark" DisplayMode='regular' symbols={TickerTapeSymbol}></TickerTape>   */}
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop: '10px'}}>
     <FilterDrawer  onChange={(e)=>{setOpenFilter(e)}} 
     Category={Category} onChangeCategory={(v)=>{setCategory(v)}} 
     linknames={linknames} onChangeLinknames={(v)=>{setLinknames(v)}}
     Rating={Rating} onChangeRating={(v)=>{setRating(v)}} 
     sortByRating={sortByRating}  onChangeSortByRating={(v)=>{setSortByRating(v)}}
     approved={approvedState} />
    <SearchFilter  searchByGrpName={searchByGrpName} onChange={(v)=>{setSearchByGrpName(v)}} onSearch={(v)=>setOnsearch(v)}/>
    <Button  value='clearFilter' color="primary" aria-label="add"  onClick={(e)=>clearFilter(e)}>
     Clear
    <ClearIcon/>
    </Button>
    </div>
{userData.length!==0 ? 
  <>
      {DataForAdmin? 
      <AdminHome AdminDataSet={DataForAdmin} approved={approvedState} onChangeApproved={(value)=>{setApprovedState(value);}}/>
        : null
      }
      <HomeCard grpData={userData} admin={adminState} onChange={handleChange} approved={approvedState}/> 
      <ToastContainer/>
      <div className='pagination'>
      <Stack spacing={2}>
      <Pagination count={pagesCount}  onChange={(e,value)=>{callHomePage(value)}} color="primary" />
      </Stack>
      </div>
  </>
  : 
  <div style={{width:'100%',height:'84vh',padding:'20px',display:'flex',alignItems:'center', justifyContent:'center'}}>

    {filterResult? 
      <p style={{color:'yellowgreen', font: "500 normal 2.5em 'tahoma'",}}>
      No Group were found, Please try a different search filter</p> 
    :
    <CircularIndeterminate  />
    }
      {/* <h5 style={{marginLeft:'10px',marginTop:'10px'}}>  If loading takes longer time then check your Internet is working...?</h5> */}
  </div>
}
</>
)
}
