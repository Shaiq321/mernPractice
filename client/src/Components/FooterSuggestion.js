import React from 'react'
import {NavLink} from 'react-router-dom'
import '../style.css';
export default function FooterSuggestion() {
  return (
       <div className="suggestionMainDiv">
   <NavLink className="suggestionlink" to="/contact">
   Found a bug on the new website? Got some suggestions? Please click here to send us your feedback.
   </NavLink>
   </div>

  )
}
