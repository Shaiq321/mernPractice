const express = require('express')
const authenticate=require('../middleware/authenticate')
const bcrypt=require('bcryptjs')
const { generateOTP } = require('./services/OTP'); 
const Router= express.Router()
require('../DB/conn')
const User=require('../Model/userSchema')
const S3=require('aws-sdk/clients/s3')
const fileUpload = require('express-fileupload');
Router.use(fileUpload());
const path=require('path')
const nodemailer= require('nodemailer')
const CryptoJS = require("crypto-js");

const { default: mongoose } = require('mongoose')
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
Router.get('/',(req,res)=>{
    res.send('home')
   })
Router.post('/register',async(req,res)=>{
   const {name,email,country,phone,work,password}= req.body
   const role="user"
   try{
   const userExist= await User.findOne({email:email})
   if(userExist){ return res.status(422).json({message : "Already Registered"})}
   const verified=false
   const user= new User({name,email,verified,role,country,phone,work,password})
   //hashing passwords
  const userData=await user.save()
  const sender='shaiqonwork@gmail.com'
  const reciever=email
  const subject='BestCryptoGroups Email Verification'
  let id = CryptoJS.AES.encrypt(JSON.stringify(userData._id), SECRET_KEY).toString();
  id=id.toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32');
  const body= '<p>Hi '+name+', Please click here to <a href="http://localhost:3000/verify/'+id+'">verify</a> your email.</p>'
  sendEmail(sender,reciever,subject,body)
  res.status(201).json({message : "User Registered"})
}
catch(err){res.json({err: "error"})}
})

Router.get('/verifyEmail',async(req,res)=>{
  try{
    const id = mongoose.Types.ObjectId(req.query.id);
    const updated=await User.findOneAndUpdate({_id:id},{verified:true},{ new: true})
    if(updated)
    {  res.status(200).json({message:"email verified"})}
    else {res.status(404).json({message:"Account not found"})}
  }
  catch(error)
  {
    console.log('errr:'+ error.message)
    res.status(400).json(error.message)
  }
})
Router.post('/login',async (req,res)=>{
    const {email,password} = req.body
    try{
   const userExist=await User.findOne({email:email})
  
   if(userExist){
    if(!userExist.verified)
    {
      const sender='shaiqonwork@gmail.com'
      const reciever=userExist.email
      const subject='BestCryptoGroups Email Verification'
      let id = CryptoJS.AES.encrypt(JSON.stringify(userExist._id), SECRET_KEY).toString();
      id=id.toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32');
      const body= '<p>Hi '+userExist.name+', Please click here to <a href="http://localhost:3000/verify/'+id+'">verify</a> your email.</p>'
      sendEmail(sender,reciever,subject,body)
      res.status(401).json({error: "Please verify Email, check Mail Inbox"})
    }
    else{
    const isMatch=await bcrypt.compare(password,userExist.password)
    if(isMatch)
    {
        const token= await userExist.generateAuthToken()
        res.cookie("jwtoken",token,{
            expires: new Date(Date.now()+25892000000),
            httpOnly:true
        })
        if(userExist.role==="admin")
        {
        res.status(201).json({message: `Login successful ${req.cookie}`})
        }
        else  res.status(200).json({message: `Login successful ${req.cookie}`})
    }
    else res.status(400).json({error: "Invalid Credential"})
     }
    }
   else res.status(400).json({error: "Invalid Credential"})
   }
catch(err){
    res.status(500).json({error: err}) 
}})
Router.post('/sendEmailOtp',async (req,res)=>{
  const {email} = req.query
  try{
    const otpGenerated = generateOTP();
    let userExist=null
    if(otpGenerated)
    {
        userExist=await User.findOneAndUpdate({email:email},{
        $set:{otp:otpGenerated}
      })
    }

 if(userExist){
   const sender='shaiqonwork@gmail.com'
   const reciever=userExist.email
   const subject='BestCryptoGroups Password Reset'
    const body= '<p>Hi '+userExist.name+', Your code is: <h3>'+otpGenerated+'</h3>'
    sendEmail(sender,reciever,subject,body)
    res.status(200).json({error: "Check Email Inbox"})
  }
 else res.status(400).json({error: "Invalid Email"})
 }
catch(err){
  res.json(err)
}})
Router.post('/resetMyPassword', async (req,res)=>{
    try {
   let {email,otp,password}=req.body
    let grpData
    password=await bcrypt.hash(password,12)
   grpData=await User.findOneAndUpdate(
    {email:email,otp:otp},
    {
      password:password},
    { new: true})

  
  if(grpData){ 
    res.status(201).json({message : "Password Changed"})
}
else 
res.status(404).json({message : "user not found"})
} catch (error) {
        console.log(error)
}})
Router.get('/logout',async (req,res)=>{
  res.clearCookie('jwtoken',{path:'/'})
  res.status(200).send('user Logout')
 })

Router.get('/about',authenticate,async (req,res)=>{
const  rootUser=req.rootUser
let img=req.rootUser.groups.img
if(img){
   img = s3.getSignedUrl('getObject', {
    Bucket: myBucket,
    Key: img,
}) 
 rootUser.groups.img=img
}
    res.send(rootUser)
   })

Router.post('/contact', async (req,res)=>{
    try {
  const {name,email,phone,message}=req.body
  const userContact=await User.findOne({email:email})
  if(userContact){ 
    await userContact.addMessage(name,email,phone,message)
  }
    const sender=email
    const reciever='shaiqonwork@gmail.com'
    const subject='BestCryptoGroups Message'
    const body='<p>Name: '+name+'</p><p>Email: '+email+'</p><p>Phone: '+phone+'</p><p>Message: '+message+'</p>'
    sendEmail(sender,reciever,subject,body)
    res.status(201).json({message : "message sent, Response will be sent on given Email"})
} catch (error) {
        console.log(error)
}})

Router.post('/addGrp',authenticate, async (req,res)=>{
    try {
   let {name,desc,category,img,whatsapp,telegram,facebook,twitter,youtube,
    instagram,reddit}=req.body
    let grpData
    if(img!=="")
    {
  const file=req.files.img
  const ext = path.parse(file.name).ext;
 imgName=`photo_${req.userID}`
 if(!file.mimetype.startsWith('image')){
  res.status(400).json({message: "images only"})
 }
 
 const Blob=req.files.img.data
console.log(Blob)
  const params={
    Bucket:myBucket,
    Key: imgName,
    Body:Blob
  }
  s3.deleteObject({
    Bucket: myBucket,
    Key: imgName,
},(error, result) => {
  console.log(error, result);
})
  s3.upload(params,function(err,data){
    console.log(err,data)
  })

   grpData=await User.findOneAndUpdate(
    {_id:req.userID},
    {"groups.name":name,"groups.desc":desc,"groups.category":category,
    "groups.rating_calculated":0,
    "groups.approved":false,"groups.img":imgName,
    "groups.links.whatsapp":whatsapp,
    "groups.links.facebook":facebook,
    "groups.links.youtube":youtube,
    "groups.links.telegram":telegram,
    "groups.links.twitter":twitter,
    "groups.links.instagram":instagram,
    "groups.links.reddit":reddit  
  },
    { new: true})
}
else {
   grpData=await User.findOneAndUpdate(
    {_id:req.userID},
    {"groups.name":name,"groups.desc":desc,"groups.category":category,"groups.approved":false,
    "groups.links.whatsapp":whatsapp,
    "groups.links.facebook":facebook,
    "groups.links.youtube":youtube,
    "groups.links.telegram":telegram,
    "groups.links.twitter":twitter,
    "groups.links.instagram":instagram,
    "groups.links.reddit":reddit  
  },
    { new: true})
}
  
  if(grpData){ 
    res.status(201).json({message : "Group added"})
}
else 
res.status(404).json({message : "user not found"})
} catch (error) {
        console.log(error)
}})
Router.post('/approveGrp', async (req,res)=>{
  try {
    const updated=await User.findOneAndUpdate({_id:req.query.id},{'groups.approved':true},{ new: true})
    if(updated)
    {   
      const body= '<p>Congrats! '+updated.name+', Your Crypto Group is approved and published on "BestCryptoGroups". Please click here <a href="http://bestcryptogroups.com/">Best Crypto Groups</a> to visit website</p>'
      res.status(200).json({message:"Grp approved"})}
    else  res.status(404).json({message:"Account not found"})

    }
    catch(error)
    {
      console.log('errr:'+ error.message)
      res.status(400).json(error.message)
    }
  })
Router.post('/disApproveGrp', async (req,res)=>{
    try {
      const updated=await User.findOneAndUpdate({_id:req.query.id},{'groups.approved':false},{ new: true})
      if(updated)
      {   
        const body= '<p>Sorry! '+updated.name+', Your Crypto Group is disapproved and unpublished from "BestCryptoGroups". Please click here <a href="http://bestcryptogroups.com/">Best Crypto Groups</a> to visit website</p>'
        res.status(200).json({message:"Grp disApproved"})}
      else  res.status(404).json({message:"Account not found"})
  
      }
      catch(error)
      {
        console.log('errr:'+ error.message)
        res.status(400).json(error.message)
      }
    })
Router.post('/deleteGrp',authenticate, async (req,res)=>{
  try {
    const {email,otp} =req.query
    grpData=await User.findOne(
      {email:email,otp:otp})
      if(grpData)
      {
const imgName=`photo_${req.userID}`
let deleteResponse,deleteError
s3.deleteObject({
  Bucket: myBucket,
  Key: imgName,
},(error, result) => {
  deleteResponse=result
  deleteError=error
  console.log(error, result);
})

const grpData=await User.updateOne({_id:req.userID}, {$unset: {groups: 1 }});
if(grpData && deleteError==null) {
  res.status(201).json({message : "Group deleted"})
}
else 
res.status(404).json({message : "user not found"})
}
else res.status(404).json({message : "Invalid OTP"})
} catch (error) {
      console.log(error)
}})

Router.post('/addRating',authenticate, async (req,res)=>{
  try 
  {
    let {reviewee_id,reviewer_rating}=req.body
    reviewer_rating=+reviewer_rating
    if(!req.userID.equals(reviewee_id))
    {
      const user=await User.findOne({_id:reviewee_id}) 
      if(user)
      {
        const newReview= await user.add_rating_calculated(reviewer_rating,req.userID);
        if(newReview)
        {
          res.status(201).json({message : "New Rating Added"})
        }
        else  res.status(200).json({message : "Your Previous Rating updated"})
      }
      else    res.status(404).json({message : "Data not found, Rating Failed"})        
    }
    else res.status(403).json({message : "you can't review yourself"})
  
  } 
  catch (error) 
  {
    console.log(error)
  }
  })

    
Router.post('/addReport',authenticate, async (req,res)=>{
  try {
    const {reportee_id,report_desc}=req.body
    const reporter_id=req.userID.valueOf()
    if(reportee_id!==reporter_id)
    {
      const userGrp=await User.findOne({_id:reportee_id})
      if(userGrp)
      { 
        await userGrp.addReport(reporter_id,report_desc)
        const sender=req.rootUser.email
        const reciever='shaiqonwork@gmail.com'
        const subject='BestCryptoGroups Report'
        const body='<div><p>Group User Name: '+userGrp.name+'</p><p>Email: '+userGrp.email+'</p><p>Phone: '+userGrp.phone+'</p><p>Group Name: '+userGrp.groups.name+'</p><p>Report Description: '+report_desc+'</p></div><div><h4>Reported By:- </h4><p>Name: '+req.rootUser.name+'</p><p>Email: '+req.rootUser.email+'</p><p>Phone: '+req.rootUser.phone+'</p></div>'
        sendEmail(sender,reciever,subject,body)
        res.status(201).json({message : "Reported"})
      }
      else 
      {
      res.status(404).json({message : "Grp owner not found"})
      }
    }
    else res.status(403)

    } catch (error) {
            console.log(error)
    }
    })

    
Router.get('/userValidity',authenticate,async (req,res)=>{
      res.status(200).send(req.rootUser)
      })
const sendEmail=async (sender,reciever,subject,body)=>{
  try{
    const transporter= nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
        user:'shaiqonwork@gmail.com',
        pass:'mcikeaiclbttmras'
      }
    });
    const mailOptions={
      from:sender,
      to:reciever,
      subject:subject,
      html:body
    }
    transporter.sendMail(mailOptions,function(error,info){
      if(error)
      {
        console.log(error);
      }
      else console.log('email sent')
      // console.log('Email sent: ',info.response, ' sender: ',sender,
      // ' reciever: ',reciever,'subject: ',subject,'body: ',body);
  
    })
  }
  catch(error)
  {
    console.log(error.message);
  }
}
   module.exports= Router




  // const user=await User.findOneAndUpdate({_id:reviewee_id,'groups.reviews.reviewer_id':reviewerID}, 
  // {
  //   $set : {"groups.reviews.$.rating" : reviewer_rating},
  // } ) 
  // const user1= await User.findOneAndUpdate({_id:reviewee_id,'groups.reviews.reviewer_id': {$ne : reviewerID }} , 
  // {
  //  $addToSet : {"groups.reviews" : {"reviewer_id":reviewerID,"rating":reviewer_rating,}} ,
  // });          