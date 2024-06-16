const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_CONNECT_URI}/${process.env.DATA_BASE}`)
        console.log(`🔥 DATABASE Connected Successfully !!!`)
    } catch (error) {
        console.log(`🚫 Error → : ${error.message}` )
    }
}

module.exports = connectDB