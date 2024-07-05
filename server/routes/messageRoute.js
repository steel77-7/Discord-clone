const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../modals/user");

const Chat = require("../modals/chatModel");
const authenticator = require("../middlewares/authenticator");
const Message = require("../modals/messageModel");

router.get("/fetchMessage", authenticator, async (req, res) => {
    try {
      
      
      const currchat = JSON.parse(req.headers.chat);
      const chat = await Chat.findOne({ _id:currchat._id });
      const messages = await Message.find({ chat: chat }).populate('sender');
      if (messages) {
        //console.log('messages : ',message)
        res.status(200).json({ messages });
      } else {
        //console.log('no messages found');
        res.status(401).json({ messages: null });
      }
    } catch (e) {
      //console.log("server error in the fetch chat",e);
      res.send({ message: "an internal server error occured " + e });
    }
  });

  module.exports = router; 