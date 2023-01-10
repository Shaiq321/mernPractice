const express = require('express')
const Router= express.Router()
const User=require('../../Model/userSchema')



require('../../DB/conn')
const DesignQuery=require('./DesignQuery')
const path=require('path')
const S3=require('aws-sdk/clients/s3')
const accessKeyId=process.env.AWS_ACCESS_KEY
const secretAccessKey=process.env.AWS_SECRET_KEY
const region=process.env.AWS_BUCKET_REGION
const myBucket=process.env.AWS_BUCKET_NAME
const SECRET_KEY=process.env.SECRET_KEY
const s3=new S3({
    region,
    accessKeyId,
    secretAccessKey
 })
Router.get('/getGrpData',async (req,res)=>{  
    let {id,limit,skipLimit,admin,approved,category,links,rating,searchByGrpName,sortByRating} = req.query;
    let homeData,countGrps
    var i=1
    console.log(admin,i++)
    
    if(admin==="admin")
    { 
      let {obj,sortObj}=DesignQuery.designQuery(approved,id,category,links,rating,searchByGrpName,sortByRating)
      if(Object.keys(sortObj).length === 0)
      {
        sortObj={ votes: 1, _id: -1 }
      }
      console.log("Find:",obj,'Sort by ',sortObj) 
     homeData=await User.find(obj, {groups:1})
     .sort(sortObj)
     .limit(limit)
     .skip(skipLimit)

       homeData.map((curElem)=>{
        const {groups}=curElem
          const mykey= groups.img
          if(mykey)
          { 
             const imgUrl = s3.getSignedUrl('getObject', {
                Bucket: myBucket,
                Key: mykey, })
                if(imgUrl)
                {groups.img=imgUrl}
                else {console.log("no image")}
          }
      })
    
  
  
      const countUsers=await User.countDocuments({})
      const verifiedUsers=await User.countDocuments({"verified":true})
      const UnVerifiedUsers=await User.countDocuments({"verified":false})
    
      const countGrps=await User.countDocuments({"groups.name":{ $exists: true  }})
      const approvedGrps=await User.countDocuments({"groups.approved":true})
      const unApprovedGrps=await User.countDocuments({"groups.approved":false})
    
      const dataForAdmin={countUsers,verifiedUsers,UnVerifiedUsers,countGrps,approvedGrps,unApprovedGrps}
  
        res.send({homeData,dataForAdmin})
    }
    else{
      let {obj,sortObj}=DesignQuery.designQuery(approved,id,category,links,rating,searchByGrpName,sortByRating) 
  
      if(Object.keys(sortObj).length === 0)
      {
        sortObj={ votes: 1, _id: -1 }
      }
      console.log("find:",obj,'sort by',sortObj) 
      homeData=await User.find(obj ,{groups:1})
      .sort(sortObj)
      .limit(limit)
      .skip(skipLimit)

        links=null
         countGrps=await User.countDocuments(obj)
        //  countGrps=await User.countDocuments({"groups.approved":true})
  
         homeData.map((curElem)=>{
          const {groups}=curElem
            const mykey= groups.img
            if(mykey)
            { 
               const imgUrl = s3.getSignedUrl('getObject', {
                  Bucket: myBucket,
                  Key: mykey, })
                  if(imgUrl)
                  {groups.img=imgUrl}
                  else {console.log("no image")}
            }
        })
        res.status(200).send({homeData,countGrps})
    }})

   
    module.exports= Router