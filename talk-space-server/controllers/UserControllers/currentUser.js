const USER = require("../../models/UserModel");

const CurrentUser = async (req, res) => {
    try{
        const currentUser = await USER.findOne({_id: req.userID}).select("-password").lean();
        if(!currentUser){
            return res.status(404).json({
                success: false,
                message: 'No User Present with given Email',
            });
        }
        return res.status(200).json({
            success: true,
            User: currentUser,
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
};

module.exports = CurrentUser;