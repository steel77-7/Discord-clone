const createChatController = async () => {
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
    } else {
      const user = await User.findOne({ _id: members });
      if (user) {
        ////console.log("user is", user);
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

    res.status(200).json({ message: "contact created" });
  } catch (error) {
    res
      .status(200)
      .json({ message: "error occured in creating contact", error: error });
  }
};
