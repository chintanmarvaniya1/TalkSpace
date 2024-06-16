const USER= require("../../models/UserModel.js");
const hashing = require("../../utilities/hashThePasword");

const signup = async (req, res) => {
    try {

        const {email,username,name,password,profile_pic} = req.body        

        if (email===undefined || username===undefined || name===undefined ||  password===undefined ) {
            return res.status(400).json({
                success: false,
                message: 'Required fields are not supplied'
            });
        }
        if (await USER.findOne({ email: email })) {
            return res.status(400).json({
                success: false,
                message: 'User Already Exist with given Email Address'
            });
        }
        if (await USER.findOne({ username: username })) {
            return res.status(400).json({
                success: false,
                message: 'UserName Already Taken By Other User'
            });
        }
        USER.create({
            email,
            username,
            name,            
            password:hashing.generateHash(password),
            profile_pic
            
        }).then((success)=>{
            return res.status(201).json({
                success: true,                
                message: 'User created!',
                userID:success.id 
            });
        })
        .catch((error)=>{
            return res.status(500).json({
                success: false,               
                message: error.message,
                error: error
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,               
            message: error.message,
            error: error
        });
    }
};

module.exports = signup;