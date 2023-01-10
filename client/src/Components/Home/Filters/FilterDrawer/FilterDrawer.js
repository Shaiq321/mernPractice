import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Linkfilter from './Linkfilter'
import RatingFilter from './RatingFilter'
import '../../../../style.css'
import CategoryFilter from './CategoryFilter';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FilterListIcon from '@mui/icons-material/FilterList';
import SortFilter from './SortFilter'
export default function FilterDrawer({Category,onChange, onChangeCategory,linknames,onChangeLinknames,
Rating,onChangeRating,sortByRating,onChangeSortByRating}) {
  const [state, setState] = useState(false)
 
  const list = () => (
    <Row>
    <Col sm>
    <CategoryFilter Category={Category} onChangeCategory={(v)=>onChangeCategory(v)}></CategoryFilter>
    </Col>
    <Col sm>
    <Linkfilter linknames={linknames} onChangeLinknames={(v)=>onChangeLinknames(v)}></Linkfilter>
    </Col>
    <Col sm>
    <RatingFilter Rating={Rating} onChangeRating={(v)=>{onChangeRating(v)}}></RatingFilter>
    </Col>
    <Col sm>
    <SortFilter sortByRating={sortByRating} onChangeSortByRating={(v)=>{onChangeSortByRating(v)}}></SortFilter>
    </Col>
    <Col sm>
    <Button sx={{ m: 1}} value='applyFilter'  variant='contained' onClick={(v)=>{ setState(false); onChange(v)}}>Apply filter</Button>
    </Col>
    </Row>
  );

  return (
     <div >  
      <Button  onClick={(e)=>setState(true)} color="primary" aria-label="add">
        Filter
        <FilterListIcon/>
      </Button>
          <Drawer
            anchor='top'        
            open={state}
            onClose={(e)=>setState(false)}
            sx={{whiteSpace: 'nowrap'}}
          >
            {list()}
          </Drawer>
          
   
 
        </div>
  );
}