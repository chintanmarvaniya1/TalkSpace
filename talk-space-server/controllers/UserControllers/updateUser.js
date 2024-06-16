const USER = require("../../models/UserModel");

const UpdateUser = async (req, res) => {
    try {
        const currentUser = await USER.findOne({_id: req.userID}).select("-password").lean();

        const { name,username, profile_pic } = req.body

        if (await USER.findOne({ username: username })) {
            return res.status(400).json({
                success: false,
                message: 'UserName Already Taken By Other User'
            });
        }

        const updateUser = await USER.updateOne({ _id : currentUser._id },{
            name,
            profile_pic,
            username
        })

        const userInfomation = await USER.findById(currentUser._id).select("-password")

        return res.json({
            message : "user update successfully",
            data : userInfomation,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
};

module.exports = UpdateUser;