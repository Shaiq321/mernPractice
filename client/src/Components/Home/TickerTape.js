// import React, { useEffect,createRef } from 'react'
// export default function TickerTape() {
//     this.myRef = createRef();
//     const componentDidMount=()=> {
//    alert('h')
//         const script = document.createElement('script');
//         script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'
//         script.async = false;
//         script.innerHTML = JSON.stringify({
//             "container_id": "tv-medium-widget",
//             "symbols": [
//                 [
//                 "Bitcoin",
//                 "BITMEX:XBTUSD|1m"
//                 ],
//                 [
//                 "Ethereum",
//                 "BITMEX:ETHUSD|1m"
//                 ]
//             ],
//             "greyText": "Quotes by",
//             "gridLineColor": "rgba(182, 182, 182, 0.65)",
//             "fontColor": "rgba(0, 0, 0, 1)",
//             "underLineColor": "rgba(60, 120, 216, 1)",
//             "trendLineColor": "rgba(60, 120, 216, 1)",
//             "width": "100%",
//             "height": "100%",
//             "locale": "en"
//         })
//         alert('a')
       
//         this.myRef.current.appendChild(script);
//       }
//       useEffect(()=>{      componentDidMount()},[])
//   return (
//     <div className="tradingview-widget-container" ref={this.myRef}>
//     <div className="tradingview-widget-container__widget"></div>    
// </div>
//   )
// }
