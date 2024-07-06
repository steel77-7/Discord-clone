const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticator = require("../middlewares/authenticator");
const User = require("../modals/user");

//********register route*********
router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    console.log(email, password, username )
    //salting and hashing password
    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(password, salt);

    //*******create user*******
    const user = await User.create({
      email: email,
      password: secPass,
      name: username,
    });

    //*************JWT**********
    const payload = {
      _id: user._id,
    };

    const authtoken = jwt.sign(payload, process.env.JWT_SECRET);
    console.log(authtoken);
    const { password: _, ...userObject } = user.toObject();
    res.status(200).json({ authtoken, userObject });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

//*******login route********
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(500)
        .json({ error: { message: "Provided credentials are wrong" } });
    }
    //***********comparing passswords*********
    await bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.send({ err });
      if (result) {
        //JWT
        const payload = {
          _id: user._id,
        };
        const authtoken = jwt.sign(payload, process.env.JWT_SECRET);
        const { password: _, ...userObject } = user.toObject();
        res.status(200).json({ authtoken, userObject });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.post("/protected", authenticator, async (req, res) => {
  if (req.user === null)
    return res.status(403).json({ error: "Invalid token", valid: false });
  const userId = req.user;

  try {
    const user = await User.findOne({ _id: userId._id });
    //

    if (user === null) {
      return res.status(500).json({ valid: false });
    }
    //***********sending the user*********
    const { password: _, ...userObject } = user.toObject();
    return res.status(200).json({ valid: true, userObject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, valid: false });
  }
});

module.exports = router;
