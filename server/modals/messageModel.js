const mongoose = require ('mongoose');

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    message:{
        type:String
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chat'
    },
    createdAt: {
        type: Date,
        Date: Date.now(),
      }
})

const Message = mongoose.model('messages', messageSchema);

module.exports = Message; 