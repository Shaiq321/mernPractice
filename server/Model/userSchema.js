const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const userSchema= mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        required:true
    },
    otp: {
        type: String,
      },
    role:{
        type:String,
        required:true
    },
    country:{
        type:String,
    },
    phone: {
        type:Number,
        required:true
    },
    work: {
        type:String,
        required:true
    }, 
    password: {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    groups:
    {
        name:{
            type:String,
        },
        desc:{
            type:String,
        
        },
        img:{
            type:String,
        },
        category:{
            type:String,
        },
        approved:{
            type:Boolean,
        },
        rating_calculated:{
            type:Number,
        },
        links:{
                    whatsapp:
                    {
                        type:String,
                   
                    },
                    facebook:
                    {
                        type:String,
                     
                    },
                    youtube:{
                        type:String,
                  
                    },
                    telegram:{
                        type:String,
                       
                    },
                    twitter:{
                        type:String,
                    
                    },
                    instagram:{
                        type:String,
                   
                    },    
                    reddit:{
                        type:String,
                     
                    }   
           
        },
        reviews:[
            {
                rating: {
                    type:Number,
                },   
            }
        ],
        reports:[
            {
                reporter_id: {
                    type:String,
                },
                report_desc: {
                    type:String,
                },   
            }
        ],
    },
    messages:[
        {
            name: {
                type:String,
                required:true
            },
            email: {
                type:String,
                required:true
            },
            phone: {
                type:Number,
                required:true
            },
            message: {
                type:String,
                required:true
            },
        }
    ],

    
    tokens: [
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
})
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
    }
    next()
})

userSchema.methods.generateAuthToken= async function(){
    const token=jwt.sign({_id:this._id},process.env.SECRET_KEY)
    this.tokens=this.tokens.concat({token:token})
    await this.save()
    return token;
}
userSchema.methods.addMessage= async function(name,email,phone,message){
 this.messages=this.messages.concat({name,email,phone,message})
await this.save()
}
userSchema.methods.addReport= async function(reporter_id,report_desc){
this.groups.reports=this.groups.reports.concat({reporter_id,report_desc})
await this.save()
}
userSchema.methods.add_rating_calculated= async function(reviewer_rating,reviewer_id){
    const rating_items=this.groups.reviews
    let rating_items_sum=reviewer_rating;
    let newReview=1
    rating_items.forEach((item)=>
    {
        if(!reviewer_id.equals(item._id))
        {
         rating_items_sum = rating_items_sum+item.rating
        }
        else {
            newReview=0
            item.rating=reviewer_rating
             }
    }
    )
    if(newReview)
    {
        this.groups.reviews=this.groups.reviews.concat({_id:reviewer_id,rating:reviewer_rating})
    }
  
    const rating_items_count=rating_items.length+newReview
    this.groups.rating_calculated= (rating_items_sum/(5*rating_items_count))*5
  
    await this.save()
    return newReview
    }

const User= mongoose.model('User',userSchema);
module.exports = User;
