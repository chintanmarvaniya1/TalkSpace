const express = require("express");
const router = express.Router();
const {CurrentUser,UpdateUser,SearchUser} = require("../controllers/UserControllers/index.js")
const validateToken = require("../middleware/validateToken")

router.route('/currentuser-detail').get(validateToken,CurrentUser); 
router.route('/update-user').post(validateToken,UpdateUser); 
router.route('/search-user').post(validateToken,SearchUser); 


module.exports = router