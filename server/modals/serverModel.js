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
    createdAt: {
        type: Date,
        Date: Date.now(),
      },
      invites:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
      ]
      
      
}
)
const Server = mongoose.model('server', serverSchema);

module.exports = Server;