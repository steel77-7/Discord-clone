const mongoose = require ('mongoose');

const chatSchema = new mongoose.Schema({
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    name:{
        type:String
    },
    createdAt: {
        type: Date,
        Date: Date.now(),
      }

}
)
const Chat = message.model('chat', chatSchema);

module.exports = Chat;