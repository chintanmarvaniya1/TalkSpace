const express = require("express");
const router = express.Router();
const {signup,verifyEmail,verifyPassword,logout} = require("../controllers/AuthControllers/index.js")


router.route('/signup').post(signup); 
router.route('/email').post(verifyEmail);
router.route('/password').post(verifyPassword);
router.route('/logout').post(logout);


module.exports = router