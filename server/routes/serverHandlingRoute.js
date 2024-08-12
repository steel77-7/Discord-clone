const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../modals/user");
var uuid = require("uuid");
const Chat = require("../modals/chatModel");
const authenticator = require("../middlewares/authenticator");

const Server = require("../modals/serverModel");
const { createChatController } = require("../controllers/chatController");

router.get("/serverList", authenticator, async (req, res) => {
  try {
    const userId = req.user;

    const serverList = await Server.find({ members: userId._id });

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
      url: uuid.v4(),
    });
    if (server) {
      req.body.name = "general";
      req.body.isServerChat = true;
      req.body.members = membersArray;
      req.body.serverid = server._id;
      await createChatController(req, res);
      return res.status(200).json({ server });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
//curretnly bruteforcing ******to be optomised later
router.get("/chatList/:serverid", authenticator, async (req, res) => {
  const serverid = req.params.serverid;
  console.log("server id", serverid);
  try {
    const chats = await Chat.find({ server: serverid });
    if (chats) {
      console.log("serverchats:", chats);
      return res.status(200).json({ chats });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/channelCreation", authenticator, async (req, res) => {
  //console.log("/handleChannelCreation route hit");
  //console.log("Request body:", req.body);
  const { serverid, channelName, channelType } = req.body;
  try {
    req.body.name = channelName;
    req.body.isServerChat = true;
    req.body.members = null;
    req.body.serverid = serverid;
    req.body.channelType = channelType;
    await createChatController(req, res);
    return res.status(201).json({ message: "Channel created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/fetchServer/:serverUrl",async (req, res) => {
  try {
    const url = req.params.serverUrl;
    console.log('fetchServer hit',url)
    
    const server = await Server.findOne({ url: url});

    if (server) {
      return res.status(200).json({ server: server });
    }
    else{
      return res.status(401).json({message:'Invalid invite link'})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.patch("/acceptRequest/:serverUrl",authenticator,async (req, res) => {
  console.log('accept request hit')
  try {
    const user= req.user;
    const url = req.params.serverUrl;
    console.log('fetchServer hit',url)
    
    const server = await Server.findOneAndUpdate({ url: url},{$addToSet:{members:user},},{new:true});

    if (server) {
      return res.status(200)
    }
    else{
      return res.status(401).json({message:''})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});




module.exports = router;
