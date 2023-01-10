import React from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom'
export default function Custom404() {
  return (
    
       <div className='text-center'>
         
<p>Sorry , The page you are looking for can't be found</p>             
<p>Try checking your URL</p>
            <h2>
                This is a <span style={{ color: "red" }}>404 page</span>
            </h2>
           
          <NavLink to="/">  <Button variant="primary">Back to Home</Button></NavLink>
    </div>
  )
}
