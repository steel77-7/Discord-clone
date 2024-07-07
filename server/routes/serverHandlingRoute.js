const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../modals/user");

const Chat = require("../modals/chatModel");
const authenticator = require("../middlewares/authenticator");
const Message = require("../modals/messageModel");
const Server = require("../modals/serverModel");
const {createChatController}= require('../controllers/chatController');

router.get("/serverList", authenticator, (req, res) => {
  try {
    const userId = req.user;
    const serverList = Server.findOne({ members: userId });
    console.log("list of servers is : ", serverList);
    if (serverList) {
      return res.status(200).json({ servers: serverList });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

//server creation
router.post("/createServer", authenticator,async (req, res) => {
  try {
    const { serverName } = req.body;
    const userId = req.user;
    let membersArray=[]
    let chatsArray = [];
    membersArray.push(userId);
    /* const chatCreation = await fetch(process.env.SERVER_API+'/chat/createChat',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${req.headers.authorization.split(" ")[1]}`,
          },
          body:JSON.stringify({name:'general',isServerChat:true,members:membersArray})
    }) */
    req.body.name = 'general';
    req.body.isServerChat = true;
    req.body.members = membersArray; 
    const chatCreation = await createChatController(req);
   
    console.log("chat creation",chatCreation)
    //data recieved after chat creation 
    let chatData;
    if(chatCreation._id){
     chatData = chatCreation.json();
     chatsArray.push(chatData._id)
    }

    //serevr is created here
    const server = Server.create({
      name: serverName,
      members: membersArray,
      chats: chatsArray,
    });
    console.log("server created : ", server);
    if (serverList) {
      return res.status(200).json({server});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
