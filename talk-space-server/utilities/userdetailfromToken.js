const jwt = require("jsonwebtoken");
const USER = require("../models/UserModel");

const getUserDetails = async(token)=>{

    const decode =  jwt.verify(token,process.env.JWT_TOKEN)

    const user = await USER.findById(decode.id).select('-password')

    return user
}

module.exports = getUserDetails