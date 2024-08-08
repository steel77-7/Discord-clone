const mongoose = require("mongoose");

const userSchma = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  friends:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    default:[]
  }],
  friendRequests:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    default:[]
  }],
  img:{
    type:String,
    default:'https://cdn.discordapp.com/icons/790606228656619561/3d40ecd2cbd666a7e0398f47c7dfd7c5.jpg?size=256.png'
  }

  
});
const User = mongoose.model("user", userSchma);

module.exports = User;
