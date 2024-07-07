const mongoose = require ('mongoose');

const serverSchema = new mongoose.Schema({
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    name:{
        type:String,
        
    },
    chats:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chat'
    }],
    createdAt: {
        type: Date,
        Date: Date.now(),
      }
      
}
)
const Server = mongoose.model('server', serverSchema);

module.exports = Server;