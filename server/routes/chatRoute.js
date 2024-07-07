const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../modals/user");
const authtenticator = require("../middlewares/authenticator");
const Chat = require("../modals/chatModel");
const {
  createChatController,
  dmList,
  allList,
} = require("../controllers/chatController");

router.get("/dmList", authtenticator, dmList);

router.post("/createChat", authtenticator, createChatController);

router.get("/allList", authtenticator, allList);

module.exports = router;
