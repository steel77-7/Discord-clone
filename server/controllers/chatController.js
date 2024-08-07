const mongoose = require("mongoose");
const User = require("../modals/user");
//const authtenticator = require("../middlewares/authenticator");
const Chat = require("../modals/chatModel");

exports.createChatController = async (req, res) => {
  const user = req.user;
  try {
    const { username, members, isServerChat } = req.body;
    //console.log(req.body);
    let finalMembers = [];

    if (isServerChat) {
      //console.log("SEERVERRRRR CHAT IS TRUEEEE");
      const chat = await Chat.create({
        members: members,
        name: req.body.name,
        isServerChat: true,
        server: req.body.serverid,
        //channelType : req.bodt.channelType
      });
      //console.log("serverchat : ", chat);
      return //console.log("returning");
    } else if (members.length > 2) {
      for (const member of members) {
        //console.log("member:", member);
        const user = await User.findOne({ _id: member });
        //console.log("user in group chats", user);
        if (user) {
          //storing the id of the !current user
          finalMembers.push(user._id); // Store user ID
          finalMembers.push(req.user);
        }
      }
    } else {
      const user = await User.findOne({ _id: members });
      if (user) {
        finalMembers.push(user._id); // Store user ID
        finalMembers.push(req.user);
      }
    }

    const chat = await Chat.create({
      members: finalMembers,
      name: members.length > 2 ? username : null,
    })
      .then((res) => {
        //console.log(res);
      })
      .catch((e) => console.log(e));
    //console.log(chat);

    return res.status(200).json({ message: "contact created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error occured in creating contact", error: error });
    console.error(error);
  }
};

exports.dmList = async (req, res) => {
  const user = req.user;

  try {
    const chat = await Chat.find({ members: user, isServerChat:false })
      .populate("members", "-password")
      .populate("latestMessage");

    // Convert user ID to string for comparison

    const chats = chat.map((chat) => {
      // Filter out the current user's ID from the members array
      chat.members = chat.members.filter(
        (member) => member._id !== user
      );
      return chat;
    });

    if (!chat) {
      return res
        .status(400)
        .json({ error: { message: "no chats to be shown" } });
    } else if (chat) {
      //console.log('chatsWithFilteredMembers',chats);
      return res.status(200).json({ chats });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

exports.allList = async (req, res) => {
  try {
    const userId = req.user;
    const users = await User.find({ _id: { $ne: userId } });
    if (!users) {
      return res
        .status(400)
        .json({ error: { message: "no chats to be shown" } });
    } else if (users) {
      ////console.log(users);
      return res.status(200).json({ users });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
