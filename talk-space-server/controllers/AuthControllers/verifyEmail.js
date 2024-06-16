const USER= require("../../models/UserModel.js");

const verifyEmail = async (req, res) => {
    try {

        const {email} = req.body        

        if (email===undefined) {
            return res.status(400).json({
                success: false,
                message: 'Required fields are not supplied'
            });
        }
        
        const checkEmail = await USER.findOne({email}).select("-password")

        if(!checkEmail){
            return res.status(404).json({
                success: false,
                message: 'No account with this email has been registered.',
            });
        }

        return res.status(200).json({
            message : "account with this email has been verify.",
            success : true,
            data : checkEmail
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,               
            message: error.message,
            error: error
        });
    }
};

module.exports = verifyEmail;