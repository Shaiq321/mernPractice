const dotenv =require('dotenv')
const { Router } = require('express')
const express = require('express')
const app= express()
var cookieParser = require('cookie-parser')
app.use(cookieParser())
dotenv.config({path: './config.env'})
const PORT= process.env.PORT
require('./DB/conn.js')
app.use(express.json())
const User=require('./Model/userSchema.js')
app.use(require('./Controller/auth'))
app.use(require('./Controller/Home/GetGrpData'))


app.listen(PORT, ()=>{
    console.log(`server running at PORT = ${PORT}`)
}
)

/* C:\Program Files\MongoDB\Server\6.0\data\
C:\Program Files\MongoDB\Server\6.0\log\ */