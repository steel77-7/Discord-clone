const express = require("express");
const router = express.Router();
const authenticator = require("../middlewares/authenticator");
const Chat = require("../modals/chatModel");
const User = require("../modals/user");
let participants = [];

router.post("/call/:chatid", authenticator, async (req, res) => {
  //const { user } = req.user;
  const { status } = req.body;

  try {
    if (status === "joining") {
      const { newParticipant } = req.body;
      const newParticipantInfo = await User.findById(newParticipant);
      participants.push(newParticipantInfo);
      res.status(200).json({ participants });
    } else if (status === "leaving") {
      const { leavingMember } = req.body;
      participants.filter((p) => p !== leavingMember);
      res.status(200).json({ participants });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
