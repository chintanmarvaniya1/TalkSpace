const express = require("express");
const {app,server} =require("./socket/index.js")
var cors = require('cors');
const cookiesParser = require('cookie-parser')

const AuthAPI = require("./routers/AuthAPI.js")
const UserAPI = require("./routers/UserAPI.js");

app.use(express.json());
app.use(cookiesParser())
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));

app.get('/',(request,response)=>{
    response.json({
        message : "Server running"
    })
})

app.use('/api',AuthAPI)
app.use('/api',UserAPI)


module.exports = app;