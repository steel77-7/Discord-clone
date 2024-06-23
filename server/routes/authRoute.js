const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const router = express.router();
const bcrypt = requrie("bcryptjs");
const authenticator = require("../middlewares/authenticator");
const User = require("../modals/user");
 
//********register route*********
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  //salting and hashing password
  const salt = bcrypt.genSaltSync(10);
  const secPass = bcrypt.hash(password, salt);

  //*******create user*******
  const user = await User.create({
    email: email,
    password: secPass,
    name: name,
  });

  //*************JWT**********
  const payload = {
    user: user._id,
  };

  const authtoken = jwt.sign(payload, process.env.JWT_SECRET);
  res.status(200).json({ authtoken });
});

//*******login route********
router.post("/login", authenticator, async (req, res) => {
  const data = req.user;
  try {
    const user = await User.findOne({ email: data.email });
    //***********comparing passswords*********
    await bcrypt.compare(data.password, user.password, (err, result) => {
      if (err) return res.send({ err });
      if (result) {
        //JWT
        const payload = {
          user: user._id,
        };
        const authtoken = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({ authtoken });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
