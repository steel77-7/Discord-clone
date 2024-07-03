const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
const User = require("../modals/user");
const authtenticator = require('../middlewares/authenticator');
const Chat = require('../modals/chatModel');


router.post('/dmList',authtenticator, async (req,res)=>{   
    const user = req.body;

    try {
        const chat = await Chat.find({members:user._id})
        if(!chat){
            return res.status(400).json({error:{message:"no chats to be shown"}})
        }
        else if(chat){
           return res.status(200).json({chat});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }

});

router.post("/createDm", authtenticator, async (req, res) => {
    try {
  
  
      const { username, members } = req.body;
      
      let finalMembers = [];
      if (members.length>2 ) {
        for (const member of members) {
          console.log(member)
          const user = await User.findOne({ name: member });
          console.log("user in group chats", user);
          if (user) {
            //storing the id of the !current user 
            finalMembers.push(user._id
            ); // Store user ID
            finalMembers.push(req.user._id);
          } else {
            
          }
        }
      } else {
        const user = await User.findOne({ name:username });
        if (user) {
          console.log(user)
          ////console.log("user is", user);
          finalMembers.push(user._id); // Store user ID
          finalMembers.push(req.user._id);
          
        }
      }
      console.log('final members in  the outer dunction ',finalMembers);
      const chat = await Chat.create({
        members: finalMembers,
        
        name:members.length>2?username:null,
      }).then(res=>{console.log(res)}).catch(e=>console.log(e));
     
  
  
      res.status(200).json({ message: "contact created" });
    } catch (error) {
      res
        .status(200)
        .json({ message: "error occured in creating contact", error: error });
    }
  });

module.exports =router;