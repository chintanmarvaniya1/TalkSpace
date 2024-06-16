const express = require("express");
const app = express();
var cors = require('cors');
const cookiesParser = require('cookie-parser')

const AuthAPI = require("./routers/AuthAPI.js")
const UserAPI = require("./routers/UserAPI.js");

app.use(express.json());
app.use(cookiesParser())
app.use(cors());

app.get('/',(request,response)=>{
    response.json({
        message : "Server running"
    })
})

app.use('/api',AuthAPI)
app.use('/api',UserAPI)


module.exports = app;