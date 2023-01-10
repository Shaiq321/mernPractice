import React from 'react'

export default function Socialicons({data}) {
const{groups}=data
const{links}=groups
const {whatsapp,telegram,facebook,twitter,youtube,instagram,reddit}=links
  return (
    <>
    {whatsapp && <a href={whatsapp} className="fa fa-whatsapp"></a>}
    {telegram &&  <a href={telegram} className="fa fa-telegram"></a>}
    {facebook &&  <a href={facebook} className="fa fa-facebook"></a>}
    {twitter &&  <a href={twitter} className="fa fa-twitter"></a>}
    {youtube && <a href={youtube} className="fa fa-youtube"></a>}
    {instagram && <a href={instagram} className="fa fa-instagram"></a>}
    {reddit && <a href={reddit} className="fa fa-reddit"></a>}  
    </>
  )
}
