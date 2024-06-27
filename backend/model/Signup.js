const mongoose=require('mongoose')

const schema=mongoose.Schema

const useschema=new schema({

    'username':String,
    'Email':String,
    'Password':String,
    'userRole':String,
    
})

module.exports=mongoose.model('Authentication',useschema)