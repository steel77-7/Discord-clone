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
    const chat = await Chat.findOne({ _id: currchat._id });
    const messages = await Message.find({ chat: chat._id }).populate("sender");
    if (messages.length > 0) {
      res.status(200).json({ messages });
    } else {
      res.status(200).json({ messages: [] });
    }
  } catch (e) {
    res.status(500).send({ message: "An internal server error occurred " + e });
  }
});

router.post("/saveMessage", authenticator, async (req, res) => {
  try {
    console.log("save message intited");
    const { message, sender, chat } = req.body;
    const newMessage = await Message.create({
      sender: sender,
      chat: chat._id,
      message: message,
    });

    const populatedMessage = await newMessage.populate('sender');
    await Chat.findByIdAndUpdate(
      chat._id,
      { $set: { latestMessage: populatedMessage } },
      { new: true }
    );
    if (populatedMessage) {
      //console.log(populatedMessage);
      res.status(200).json({ message: "message saved" ,latestMessage:populatedMessage});
    } else {
      res.status(500).json({ message: "database error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "database error" + error });
  }
});

router.patch("/editMessage/:messageid", authenticator, async (req, res) => {
  try {
    const mess_id = req.params.messageid;
    //console.log("patch inititated",req.body)
    const { message } = req.body;
    const result = await Message.findByIdAndUpdate(
      mess_id,
      { $set: { message: message } },
      {new:true}
    );

    //console.log("Message update results :", result);
    res.send({ message: "message updated ",result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "message not updated" });
  }
});
router.delete("/deleteMessage/:messageid", authenticator, async (req, res) => {
  try {
    console.log("delete message initiated");
    const mess_id = req.params.messageid;
    //console.log("message is :", mess_id);
    const result = await Message.findByIdAndDelete(mess_id);
    //console.log("Message deletion results :", result);
    res.send({ message: "message deleted " ,result});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "message not deleted" });
  }
});

module.exports = router;
