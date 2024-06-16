const express = require('express')
const { Server } = require('socket.io')
const http  = require('http')
const getUserDetail = require('../utilities/userdetailfromToken.js')
const USER = require("../models/UserModel.js")
const Conversation = require("../models/ConversionModel.js")

const app = express()

const server = http.createServer(app)
const io = new Server(server,{
    cors : {
        origin : process.env.FRONTEND_URL,
        credentials : true
    }
})

const onlineUser = new Set()
io.on('connection',async(socket)=>{
    console.log("connect User ", socket.id)

    const token = socket.handshake.auth.token
    user = await getUserDetail(token)

    socket.join(user?._id.toString())
    onlineUser.add(user?._id?.toString())
    io.emit('onlineUser',Array.from(onlineUser))

    socket.on('message-page',async(userId)=>{
        console.log('userId',userId)
        const userDetails = await USER.findById(userId).select("-password")
        
        const payload = {
            _id : userDetails?._id,
            name : userDetails?.name,
            email : userDetails?.email,
            profile_pic : userDetails?.profile_pic,
            online : onlineUser.has(userId)
        }
        socket.emit('message-user',payload)


         //get previous message
         const getConversationMessage = await Conversation.findOne({
            "$or" : [
                { sender : user?._id, receiver : userId },
                { sender : userId, receiver :  user?._id}
            ]
        }).populate('messages').sort({ updatedAt : -1 })

        socket.emit('message',getConversationMessage?.messages || [])
    })

    socket.on('disconnect',()=>{
        console.log('disconnect user ',socket.id)
    })
})

module.exports = {
    app,
    server
}