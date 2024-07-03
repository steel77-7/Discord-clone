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
  
    //salting and hashing password
    const salt = bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(password, salt);
  
    //*******create user*******
    const user = await User.create({
      email: email,
      password: secPass,
      name: username,
    });
  
    //*************JWT**********
    const payload = {
      user: user._id,
    };
  
    const authtoken = jwt.sign(payload, process.env.JWT_SECRET);
    console.log(authtoken)
    res.status(200).json({ authtoken });
    
  } catch (error) {
    console.error(error)
    res.status(400).json(error);
  }
});

//*******login route********
router.post("/login", async (req, res) => {
  const {email,password} = req.body;
  try {
    const user = await User.findOne({ email: email });
    //***********comparing passswords*********
    await bcrypt.compare(password, user.password, (err, result) => {
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
