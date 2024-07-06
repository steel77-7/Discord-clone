const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../modals/user");

const Chat = require("../modals/chatModel");
const authenticator = require("../middlewares/authenticator");
const Message = require("../modals/messageModel");

router.get("/fetchMessage", authenticator, async (req, res) => {
    try {
      
      
      const currchat = req.headers.chat;
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

  router.post("/saveMessage", authenticator, async (req, res) => {
    try {
      const { message, sender, chat } = req.body;
      const newMessage = await Message.create({
        sender: sender,
        chat: chat,
        message: message,
      });
      if (newMessage) {
        consoel.log(newMessage)
        res.status(200).json({ message: "message saved" });
      } else {
        res.status(200).json({ message: "database error" });
      }
    } catch (error) {
      res.status(500).json({ message: "database error" + error });
    }
  });

  router.post('/editMessage',authenticator, async (req,res)=>{
    try {
      const {message}= req.body;
      console.log(message)
      const result = await Message.findOneAndUpdate({_id:message._id},{$set:{message:message.message}})
      console.log('Message update results :',result)
      res.send({message:'message updated '})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'message not updated'});
    }
  })
  router.post('/deleteMessage',authenticator, async (req,res)=>{
    try {
      const {message}= req.body;
      console.log('message is :',message)
      const result = await Message.findByIdAndDelete(message._id);
      console.log('Message deletion results :',result)
      res.send({message:'message deleted '})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'message not deleted'});
    }
  })

  module.exports = router; 