const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const User = require('../modals/user');
const authenticator = require('../middlewares/authenticator');

router.get('/getfriends',authenticator,async (req,res)=>{
    try {
        const userid =req.user;
        const friends = await  User.findById(userid).select('friends').populate('friends');
        if(friends){
            return res.status(200).json({friends})
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error})
    }
})

module.exports = router