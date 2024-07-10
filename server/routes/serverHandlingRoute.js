const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../modals/user");

const Chat = require("../modals/chatModel");
const authenticator = require("../middlewares/authenticator");
const Message = require("../modals/messageModel");
const Server = require("../modals/serverModel");
const { createChatController } = require("../controllers/chatController");

router.get("/serverList", authenticator, async (req, res) => {
  console.log("user id :", req.user);
  try {
    const userId = req.user;
    console.log(userId._id);
    const serverList = await Server.find({ members: userId._id });
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
router.post("/createServer", authenticator, async (req, res) => {
  try {
    const { serverName } = req.body;
    const userId = req.user;
    let membersArray = [];
    membersArray.push(userId);

    const server = await Server.create({
      name: serverName,
      members: membersArray,
    });
    if (server) {
      req.body.name = "general";
      req.body.isServerChat = true;
      req.body.members = membersArray;
      req.body.serverid = server._id;
      await createChatController(req);
      return res.status(200).json({ server });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
//curretnly bruteforcing ******to be optomised later
router.get("/chatList", authenticator, async (req, res) => {
  console.log('guild chats')
  const serverid = req.headers.serverid;
  try {
    console.log(req.headers)
    const chats = await Chat.find({ server: serverid });
    if (chats) {
      console.log('serverchats:',chats)
      return res.status(200).json({ chats });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
