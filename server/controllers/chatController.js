const mongoose = require("mongoose");
const User = require("../modals/user");
//const authtenticator = require("../middlewares/authenticator");
const Chat = require("../modals/chatModel");

exports.createChatController = async (req, res) => {
  const user = req.user;
  try {
    const { username, members, isServerChat } = req.body;
    console.log(req.body);
    let finalMembers = [];
    if (members.length > 2 && !isServerChat) {
      for (const member of members) {
        console.log("member:", member);
        const user = await User.findOne({ _id: member });
        console.log("user in group chats", user);
        if (user) {
          //storing the id of the !current user
          finalMembers.push(user._id); // Store user ID
          finalMembers.push(req.user);
        }
      }
    } else if (isServerChat) {
      console.log('SEERVERRRRR CHAT IS TRUEEEE')
      const chat = await Chat.create({
        members: members,
        name: req.body.name,
        isServerChat: true,
        server:req.body.serverid
      });
      console.log('serverchat : ',chat)
      return ;
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
        console.log(res);
      })
      .catch((e) => console.log(e));
    console.log(chat);

   return  res.status(200).json({ message: "contact created" });
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
    const chat = await Chat.find({ members: user }).populate(
      "members",
      "-password"
    );
    if (!chat) {
      return res
        .status(400)
        .json({ error: { message: "no chats to be shown" } });
    } else if (chat) {
      //console.log(chat);
      return res.status(200).json({ chat });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

exports.allList = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res
        .status(400)
        .json({ error: { message: "no chats to be shown" } });
    } else if (users) {
      //console.log(users);
      return res.status(200).json({ users });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
