const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    Date: Date.now(),
  },
  url: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default:
      "https://cdn.discordapp.com/icons/790606228656619561/3d40ecd2cbd666a7e0398f47c7dfd7c5.jpg?size=256.png",
  },
});
const Server = mongoose.model("server", serverSchema);

module.exports = Server;
