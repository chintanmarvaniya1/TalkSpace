const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    
    email : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    profile_pic : {
        type : String,
        default : ""
    }
},{
    timestamps : true
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel