const limit=4
const calculatePages=(totalGrps)=>{
    totalGrps=parseInt(totalGrps)
    const pages=Math.ceil(totalGrps/limit)
     return pages
  }
const _callHomePage=async (id,state,approvedState,Category,linknames,Rating,searchByGrpName,sortByRating,page)=>{
    try {
        let _UserData,_PagesCount,_DataForAdmin,_FilterStatus;
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
        _FilterStatus=true
      }
      const data= await res.json()
      let {homeData,countGrps,dataForAdmin}=data
      
      _UserData=homeData
      console.log(homeData)
      if(countGrps)
      {
        const pages=calculatePages(countGrps)
        _PagesCount=pages
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
        _PagesCount=pages
        _DataForAdmin=dataForAdmin
      }
    
       if(res.status!==200)
      {
        const error= new Error(res.error)
        throw error
      }
      return {_UserData,_PagesCount,_DataForAdmin,_FilterStatus}
     
    } catch (err) {
      console.log(err)
      toast(err)
      
    }
      }
module.exports = { _callHomePage }