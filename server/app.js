const dotenv =require('dotenv')
const mongoose= require('mongoose')
const express = require('express')
const app= express()
dotenv.config({path: './config.env'})
const DB= process.env.DATABASE
mongoose.connect(DB).then(()=>{
    console.log('connected');
}).catch((err)=>{console.log('failed: ' + err);})
const middleware = (req,res,next) =>{
console.log('running'); 
next();
}

app.get('/',(req,res)=>{
    ``
 res.send('home')
})
app.get('/about',middleware,(req,res)=>{
    res.send('about')
   })
   app.get('/contact',(req,res)=>{
    res.send('contact')
   })
   app.get('/login',(req,res)=>{
    res.send('login')
   })
   app.get('/register',(req,res)=>{
    res.send('register')
   })

app.listen(3000, ()=>{
    console.log('server running')
}
)
/* C:\Program Files\MongoDB\Server\6.0\data\
C:\Program Files\MongoDB\Server\6.0\log\ */