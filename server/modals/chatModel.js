const mongoose = require ('mongoose');

const chatSchema = new mongoose.Schema({
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    name:{
        type:String,
        
    },
    isServerChat:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        Date: Date.now(),
      },
      server :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'server'
      },
      latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'messages',
        default:null
      },
      channelType:{
        type:String,
        default:null
      }
      
}
)
const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;