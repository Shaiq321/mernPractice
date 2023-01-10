const Analytics=require('../../Model/analyticSchema')
const designQuery=(approved,id,category,links,rating,searchByGrpName,sortByRating)=>{
    const {FreePaid,FreeOnly,PaidOnly} = JSON.parse(category)  
  let obj={},sortObj={};
  if(approved!=='undefined')
  {
    approved=JSON.parse(approved)
    if(approved===false)
    {
      obj["groups.approved"]=false
    }
    else obj["groups.approved"]=true
  }
  else obj["groups.approved"]=true
    if(id!=='undefined' &&  id!=='')
    {
      obj["_id"]=id   
    }
    if(searchByGrpName!=='undefined' &&  searchByGrpName!=='')
    {
      obj["groups.name"]= {$regex: searchByGrpName, $options: "i"}
      const analytics=Analytics.findOneAndUpdate(
        {_id:'639b33dae4076f6ba10f3bb6' },
        { $push: { keywords: searchByGrpName  } },
        { new: true }
    )
   
      if(analytics)
      { 
      console.log("keyword added")
      }
      else console.log("keyword not added")
    }
    let array=[]
    if(FreePaid===true)
    {
      array.push("Free + Paid")
    }
    if(FreeOnly===true)
    {
      array.push("Free only")
    }
    if(PaidOnly===true)
    {
      array.push("Paid only")
    } 
    if(array.length && array.length<3)
    {
    obj["groups.category"]={$in:array}   
    }
    if(rating!=='undefined' && rating!=='Rating' && rating!=='')
    {
      rating=+rating  
      obj["groups.rating_calculated"]={$gt: rating}   
    }
    if(links!=='undefined' && links.length!==0 )
    {
      links = links.split(',');
    for(let i=0;i<links.length;i++)
    {
    var key = "groups.links."+links[i];
   obj[key] = { "$nin": [ null, "" ] };
    }
    
    }
    if(sortByRating==='Sort by Rating')
    {
      sortObj['groups.rating_calculated']=-1
    }
    return {obj,sortObj}
  }
  module.exports = { designQuery }