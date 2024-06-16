const USER = require("../../models/UserModel");

const SearchUser = async (req, res) => {
    try {
        const { search } = req.body

        const query = new RegExp(search,"i","g")

        const user = await USER.find({
            "$or" : [
                { name : query },
                {username:query },
                { email : query }
            ]
        }).select("-password")
        return res.json({
            message : 'List of All User',
            data : user,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
}

module.exports = SearchUser;