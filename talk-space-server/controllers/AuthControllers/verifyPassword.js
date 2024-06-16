const USER= require("../../models/UserModel.js");
const hashing = require("../../utilities/hashThePasword.js");
const jwt = require('jsonwebtoken');



const verifyPassword = async (req, res) => {
    try {

        const { password, userId } = req.body

        const user = await USER.findById(userId)  
        
        const verifyPassword = hashing.validPassword(password, user.password);

        if(!verifyPassword){
            return res.status(400).json({
                success: false,
                message: 'Password Incorrect !!'
            })
        }

        const tokenData = {
            id : user._id,
        }
        const token = jwt.sign(tokenData,process.env.JWT_TOKEN)

        const cookieOptions = {
            http : true,
            secure : true
        }

        return res.cookie('token',token,cookieOptions).status(200).json({
            message : "Login successfully",
            success :true,
            token : token
            
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,               
            message: error.message,
            error: error
        });
    }
};

module.exports = verifyPassword;