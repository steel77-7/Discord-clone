const express = require("express");
const router = express.Router();
const authenticator = require("../middlewares/authenticator");


router.post('/call/:chatid', authenticator, (req,res)=>{
        

})

module.exports = router;
