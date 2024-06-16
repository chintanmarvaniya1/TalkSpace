const signup = require("./signup.js")
const verifyEmail = require("./verifyEmail.js");
const verifyPassword = require("./verifyPassword.js");
const logout = require("./logout.js");

const Controller = {
    signup,
    verifyEmail,
    verifyPassword,
    logout
};


module.exports = Controller;
  