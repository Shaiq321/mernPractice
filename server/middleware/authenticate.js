const jwt=require('jsonwebtoken')

var express = require('express')
var cookieParser = require('cookie-parser')
var app = express()
app.use(cookieParser())

const User=require('../Model/userSchema')
const authenticate =async (req,res,next)=>{
    try {
const token = req.cookies.jwtoken
const verifyToken=jwt.verify(token,process.env.SECRET_KEY)
const rootUser= await User.findOne({_id:verifyToken._id, "tokens.token":token})
if(!rootUser){throw new Error("user not found")}
req.token=token
req.rootUser=rootUser
req.userID=rootUser._id
next()
} catch (error) {
    res.status(401).send("Unauthorized: no token provided")
        console.log("user not login")
}}
module.exports=authenticate