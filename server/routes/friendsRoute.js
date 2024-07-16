const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../modals/user");
const authenticator = require("../middlewares/authenticator");

router.get("/getfriends", authenticator, async (req, res) => {
  try {
    const userid = req.user;
    const friends = await User.findById(userid)
      .select("friends")
      .populate("friends");
    if (friends) {
      return res.status(200).json({ friends });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.post("/friendRequest", authenticator, async (req, res) => {
  try {
    const userid = req.user;
    const recipientId = req.body.recipient;
    console.log(req.body);
    const friendReq = await User.findOneAndUpdate(
      { _id: recipientId }, // Filter to find the recipient user
      { $push: { friendRequests: userid } }, // Push the sender's ID to friendRequests
      { new: true }
    );
    console.log("friend request", friendReq);
    return res.status(200).json({ friendReq });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.post("/handleFriendRequest", authenticator, async (req, res) => {
  console.log("handle friend request initited");
  try {
    const userid = req.user;
    //friend reciepient is the one that sent the request
    const { member, status } = req.body;
    console.log(req.body);
    if (status) {
      const user = await User.findByIdAndUpdate(
        userid,
        {
          $push: { friends: member },
          $pull: { friendRequests: member },
        },

        { new: true }
      );

      await User.findByIdAndUpdate(
        member,
        {
          $push: { friends: userid },
        },

        { new: true }
      );
      return res.status(200).json({ message: "Friend request accepted" });
    } else {
      const user = await User.findByIdAndUpdate(
        userid,
        {
          $pull: { friendRequests: member },
        },

        { new: true }
      );
      return res.status(200).json({ message: "Friend request rejected" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
